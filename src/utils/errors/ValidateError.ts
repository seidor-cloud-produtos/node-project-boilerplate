import * as yup from 'yup';

import { HttpError } from './HttpError';

export class ValidateError extends HttpError {
    errors: { property: string; message: string }[];

    constructor(error: yup.ValidationError) {
        super(400, 'Validation Error');

        this.errors = error.inner.map(err => {
            return { property: err.path, message: err.type };
        });
    }
}
