import { object, pipe, string, nonEmpty, optional, minLength, InferOutput, nullish } from "valibot";
import {
    NAME_REQUIRED,
    NAME_IS_STRING,
    CODE_REQUIRED,
    CODE_IS_STRING,
    NAME_TOO_SHORT,
    CODE_TOO_SHORT,
} from "../../constants/appMessages";

export const VCreateCompanySchema = object({
    name: pipe(
        string(NAME_IS_STRING),
        nonEmpty(NAME_REQUIRED),
        minLength(2, NAME_TOO_SHORT)
    ),
    description: nullish(string()),
    address: nullish(string()),
    code: pipe(
        string(CODE_IS_STRING),
        nonEmpty(CODE_REQUIRED),
        minLength(2, CODE_TOO_SHORT)
    ),
});

export const VUpdateCompanySchema = object({
    name: pipe(
        string(NAME_IS_STRING),
        nonEmpty(NAME_REQUIRED),
        minLength(2, NAME_TOO_SHORT)
    ),
    description: nullish(string()),
    address: nullish(string()),
    code: pipe(
        string(CODE_IS_STRING),
        nonEmpty(CODE_REQUIRED),
        minLength(2, CODE_TOO_SHORT)
    )
});

export type ValidatedCreateCompany = InferOutput<typeof VCreateCompanySchema>;
export type ValidatedUpdateCompany = InferOutput<typeof VUpdateCompanySchema>;
