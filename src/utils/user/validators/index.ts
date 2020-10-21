import { body, query, param } from 'express-validator';

export const idParamValidator = [param('id').isUUID()];

export const createValidators = [
    body('name').isString(),
    body('surname').isString(),
    body('age').isNumeric(),
    body('email').isEmail().optional(),
];

export const updateValidators = [
    body('name').isString().optional(),
    body('surname').isString().optional(),
    body('age').isNumeric().optional(),
    body('email').isEmail().optional(),
].concat(idParamValidator);

export const getallValidator = [
    query('size').isNumeric().optional(),
    query('page').isNumeric().optional(),
];
