import { body } from 'express-validator';

export const createValidators = [
    body('author').isString(),
    body('genre').isString(),
    body('name').isNumeric(),
    body('subtitle').isEmail().optional(),
];
