import { flatten, safeParseAsync } from "valibot";
import { AppActivity, ValidatedRequest } from "../types/app.types";
import UnprocessableContentException from "../exceptions/unprocessableContentException";
import { VCreateCompanySchema, VUpdateCompanySchema } from "../validations/schemas/vCompanySchema";

export const validateRequest = async<R extends ValidatedRequest>(actionType: AppActivity, reqData: any, errorMessage: string) => {
    let schema;

    switch (actionType) {
        case "company:create-company":
            schema = VCreateCompanySchema;
            break;
        case "company:update-company":
            schema = VUpdateCompanySchema;
            break;
    }

    const validation = await safeParseAsync(schema!, reqData, {
        abortPipeEarly: true,
    });

    if (!validation.success) {
        throw new UnprocessableContentException(errorMessage, flatten(validation.issues).nested);
    }

    return validation.output as R;
};
