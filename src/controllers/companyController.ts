import { Context } from "hono";
import { validateRequest } from "../validations/validationRequest";
import { COMPANY_VALIDATION_ERROR, COMPANY_ADD_SUCCESSFULLY, COMPANIES_FETCHED_SUCCESSFULLY, COMPANY_NOT_FOUND, COMPANY_DETAILS_FETCHED_SUCCESS, COMPANY_UPDATE_SUCCESSFULLY, COMPANY_CODE_EXISTS, COMPANY_REMOVE_SUCCESSFULLY } from "../constants/appMessages";
import { sendSuccessResponse } from "../utils/responseUtils";
import { DBTableColumns, OrderByQueryData, SortDirection, WhereQueryData } from "../types/db.types";
import { Company, companies } from "../schemas/companySchema";
import { getPaginatedRecordsConditionally, getRecordById, saveSingleRecord, softDeleteRecordById, updateRecordById } from "../services/db/baseDBService";
import NotFoundException from "../exceptions/notFoundException";
import UnprocessableContentException from "../exceptions/unprocessableContentException";
import { ValidatedCreateCompany } from "../validations/schemas/vCompanySchema";
import ConflictException from "../exceptions/conflictException";
import { seedCompanies } from "../seeder/companyDataSeeder";

class CompanyController {
    addCompany = async (c: Context) => {
        try {
            const requestBody = await c.req.json();

            const validatedCompany = await validateRequest<ValidatedCreateCompany>("company:create-company", requestBody, COMPANY_VALIDATION_ERROR);

            const companyData = {
                ...validatedCompany,
            };
            const createdCompany = await saveSingleRecord<Company>(companies, companyData);

            return sendSuccessResponse(c, 201, COMPANY_ADD_SUCCESSFULLY, createdCompany);
        } catch (error: any) {
            if (error.constraint === "companies_code_unique") {
                throw new ConflictException(COMPANY_CODE_EXISTS);
            }
            throw error;
        }
    };

    getAllCompanies = async (c: Context) => {
        try {
            const page = +c.req.query("page")! || 1;
            const pageSize = +c.req.query("page_size")! || 10;
            const searchString = c.req.query("search_string") || null;

            let orderByQueryData: OrderByQueryData<Company> = {
                columns: ["id"],
                values: ["desc"],
            };

            const orderBy = c.req.query("order_by");
            if (orderBy) {
                let orderByColumns: DBTableColumns<Company>[] = [];
                let orderByValues: SortDirection[] = [];
                const queryStrings = orderBy.split(",");
                for (const queryString of queryStrings) {
                    const [column, value] = queryString.split(":");
                    orderByColumns.push(column as DBTableColumns<Company>);
                    orderByValues.push(value as SortDirection);
                }
                orderByQueryData = {
                    columns: orderByColumns,
                    values: orderByValues,
                };
            }

            let whereQueryData: WhereQueryData<Company> = {
                columns: ["deleted_at"],
                values: [null],
            };

            if (searchString) {
                whereQueryData.columns.push("name");
                whereQueryData.values.push(`%${searchString}%`);
            }

            const columnsToSelect = ["id", "name", "description", "address", "code", "created_at", "updated_at"] as const;

            const results = await getPaginatedRecordsConditionally<Company>(
                companies,
                page,
                pageSize,
                orderByQueryData,
                whereQueryData,
                columnsToSelect
            );

            if (!results) {
                throw new NotFoundException(COMPANY_NOT_FOUND);
            }

            return sendSuccessResponse(c, 200, COMPANIES_FETCHED_SUCCESSFULLY, results);
        } catch (error: any) {
            throw error;
        }
    };

    getCompanyById = async (c: Context) => {
        try {
            const id = +c.req.param("id");

            const companyDetails = await getRecordById<Company>(companies, id);

            if (!companyDetails) {
                throw new NotFoundException(COMPANY_NOT_FOUND);
            }

            return sendSuccessResponse(c, 200, COMPANY_DETAILS_FETCHED_SUCCESS, companyDetails);
        } catch (error: any) {
            throw error;
        }
    };

    updateCompany = async (c: Context) => {
        try {
            const id = +c.req.param("id");

            const requestBody = await c.req.json();

            const validatedCompany = await validateRequest("company:update-company", requestBody, COMPANY_VALIDATION_ERROR);

            const existingCompany = await getRecordById<Company>(companies, id);

            if (!existingCompany) {
                throw new NotFoundException(COMPANY_NOT_FOUND);
            }

            const updatedCompanyData = {
                ...existingCompany,
                ...validatedCompany,
                updated_at: new Date(),
            };

            const updatedCompany = await updateRecordById<Company>(companies, id, updatedCompanyData);

            return sendSuccessResponse(c, 200, COMPANY_UPDATE_SUCCESSFULLY, updatedCompany);
        } catch (error: any) {
            if (error.constraint === "companies_code_unique") {
                throw new ConflictException(COMPANY_CODE_EXISTS);
            }
            throw error;
        }
    };

    removeCompany = async (c: Context) => {
        try {
            const id = +c.req.param("id");
            const existingCompany = await getRecordById<Company>(companies, id);

            if (!existingCompany) {
                throw new NotFoundException(COMPANY_NOT_FOUND);
            }

            await softDeleteRecordById<Company>(companies, id, { deleted_at: new Date() });

            return sendSuccessResponse(c, 200, COMPANY_REMOVE_SUCCESSFULLY);
        } catch (error: any) {
            throw error;
        }
    };

    seedCompaniesDummyData = async (c: Context) => {
        try {

            await seedCompanies();

            return sendSuccessResponse(c, 200, "Company dummy data has seeded successfully.");
        } catch (error: any) {
            console.error(error);
            throw error
        }
    };
}

export default CompanyController;
