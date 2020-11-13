/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { HttpError } from './HttpError';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ValidateError extends HttpError {
    code: number;

    errors: string[];

    propertiesWithError: string[];

    constructor(code: number, error: any, message: string) {
        super(code, message);
        this.code = code;

        this.errors = error.errors;
        this.propertiesWithError = error.inner.map(
            (item: { path: any }) => item.path,
        );
    }
}
