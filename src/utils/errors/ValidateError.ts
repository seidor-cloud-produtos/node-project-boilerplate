export class ValidateError extends Error {
    code: number;

    errors: string[];

    constructor(code: number, errors: string[], message: string) {
        super(message);
        this.code = code;
        this.errors = errors;
    }
}
