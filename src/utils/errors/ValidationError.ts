import { ValidationError } from 'express-validator';

import { HttpError } from './HttpError';

export class ValidatorError extends HttpError {
    errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super(400, 'Bad Request');

        this.errors = errors;
    }
}
