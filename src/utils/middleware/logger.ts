import { Request, Response, NextFunction } from 'express';
import pino from 'pino-http';

const log = pino();

export default async function logger(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
        log(req, res);
    }

    return next();
}
