import { Router } from 'express';

import * as UserController from '../controllers/user';
import { createUserSchema } from '../utils/validators/user/user.validator';
import validatorMiddleware from '../utils/middleware/validator';

const router = Router();

router.post(
    '/',
    validatorMiddleware({ body: createUserSchema }),
    UserController.create,
);

export default router;
