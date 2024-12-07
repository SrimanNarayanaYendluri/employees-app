
import { Company } from "../schemas/companySchema";
import { ValidatedCreateProduct, ValidatedUpdateProduct } from "../validations/schemas/vProductSchema"
import { ValidatedCreateUser } from "../validations/schemas/vCreateUserSchema";
import { DBTableRow } from "./db.types";
import { ValidatedCreateCompany } from "../validations/schemas/vCompanySchema";

export type PaginationInfo = {
  total_records: number;
  total_pages: number;
  page_size: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
};

export type PaginatedResp<T extends DBTableRow> = {
  pagination_info: PaginationInfo,
  records: T[];
};


export type CreateCompanyResponse = {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  code: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export type CreateProductResponse = {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  code: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
}


export type getAllCompaniesResponseData = {
  pagination_info: PaginationInfo;
  records: Company[]; 
}

export type InsertUserResponse = {
  id: number;
  user_name: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}
export type AppResponseData = CreateCompanyResponse
  | InsertUserResponse
  | getAllCompaniesResponseData

export type SuccessResponseData = {
  status: number;
  success: true;
  message: string;
  data?: AppResponseData;
};

export type UserActivity = "user:create-user"

export type ProductActivity = "product:create-product" | "product:update-product"

export type CompanyActivity = "company:create-company" | "company:update-company"

export type AppActivity = UserActivity | ProductActivity | CompanyActivity

export type ValidatedRequest = ValidatedCreateCompany | ValidatedCreateUser | ValidatedCreateProduct | ValidatedUpdateProduct