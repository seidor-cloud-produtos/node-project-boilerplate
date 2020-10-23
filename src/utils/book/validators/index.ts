import { body } from 'express-validator';

export const createValidators = [
    body('author').isString(),
    body('genre').isString(),
    body('name').isString(),
    body('subtitle').isString(),
];
