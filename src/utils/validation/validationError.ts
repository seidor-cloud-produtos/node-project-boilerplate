/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationError } from 'express-validator/src/base';

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
