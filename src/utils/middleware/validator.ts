import { Response, Request, NextFunction, RequestHandler } from 'express';
import * as yup from 'yup';

import { validateSchemaData } from '../validators/common/validator.error';

export default function validatorMiddleware(schemas: {
    body?: yup.ObjectSchema;
    headers?: yup.ObjectSchema;
    query?: yup.ObjectSchema;
}): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (schemas.headers) await validateSchemaData(req.headers, schemas.headers);
        if (schemas.query) await validateSchemaData(req.query, schemas.query);
        if (schemas.body) await validateSchemaData(req.body, schemas.body);

        next();
    };
}
