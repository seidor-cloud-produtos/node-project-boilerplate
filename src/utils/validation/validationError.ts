/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationError } from 'express-validator/src/base';
import * as yup from 'yup';
import { ValidateError } from '../errors/ValidateError';

const extractErrors = (validationErrors: ValidationError[]) => {
    let paramsErrors = validationErrors.map(error => error.param);
    validationErrors.forEach((error: any) => {
        if (error.nestedErrors) {
            const nestedErrorsParams = error.nestedErrors.map(
                (nestedError: { param: any }) => nestedError.param,
            );
            paramsErrors = paramsErrors.concat(nestedErrorsParams);
        }
    });
    return paramsErrors.filter(error => error !== '_error');
};

export const isParamsInValidationErrors = (
    params: string[],
    validationErrors: ValidationError[],
): boolean => {
    const validErrors = extractErrors(validationErrors);
    return params.every(error => validErrors.includes(error));
};

export const validateSchemaData = async <T>(
    data: T,
    schema: yup.ObjectSchema<yup.Shape<object | undefined, object>, object>,
): Promise<void> => {
    try {
        await schema.validate(data, { abortEarly: false });
    } catch (err) {
        throw new ValidateError(400, err, 'Validate error');
    }
};
