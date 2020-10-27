import { Response, Request, NextFunction } from 'express';
import { validateSchemaData } from '../../validation/validationError';
import { UserInterface } from '../../../interfaces/user';
import { userSchema } from '../validators';

export default async function validateUserDataMiddleware(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<Response | void> {
    await validateSchemaData<UserInterface>(request.body, userSchema);

    return next();
}
