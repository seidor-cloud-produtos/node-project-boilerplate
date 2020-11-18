import { Router } from 'express';

import * as BookController from '../controllers/book';
import { bookSchema } from '../utils/book/validators';
import validatorMiddleware from '../utils/middleware/validator';

const router = Router();

router.post('/', validatorMiddleware({ body: bookSchema }), BookController.create);

export default router;
