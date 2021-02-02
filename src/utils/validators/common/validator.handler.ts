import { Request } from 'express';
import { validationResult, matchedData } from 'express-validator';

import { ValidatorError } from '../../errors/ValidationError';

export const throwsIfNotValid = (req: Request): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidatorError(errors.array());
    }
};

export const getValidData = (
    req: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { headers: any; body: any; query: any; params: any } => {
    throwsIfNotValid(req);

    const data = {
        headers: getMatchedHeader(req),
        body: getMatchedBody(req),
        params: getMatchedParams(req),
        query: getMatchedQuery(req),
    };

    return data;
};

export const deleteCheckBodyKeys = (
    body: Record<string, unknown>,
): Record<string, unknown> => {
    const data = { ...body };

    delete data[''];

    return data;
};

export const getMatchedQuery = (req: Request): Record<string, unknown> => {
    const data = matchedData(req, {
        onlyValidData: true,
        includeOptionals: false,
        locations: ['query'],
    });

    return data;
};

export const getMatchedBody = (req: Request): Record<string, unknown> => {
    const data = matchedData(req, {
        onlyValidData: true,
        includeOptionals: false,
        locations: ['body'],
    });

    return deleteCheckBodyKeys(data);
};

export const getMatchedHeader = (req: Request): Record<string, unknown> => {
    const data = matchedData(req, {
        onlyValidData: true,
        includeOptionals: false,
        locations: ['headers'],
    });

    return data;
};

export const getMatchedParams = (req: Request): Record<string, unknown> => {
    const data = matchedData(req, {
        onlyValidData: true,
        includeOptionals: false,
        locations: ['params'],
    });

    return data;
};
