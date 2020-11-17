import { Router } from 'express';

import BookController from '../controllers/book';
import { bookSchema } from '../utils/book/validators';
import validatorMiddleware from '../utils/middleware/validator';

const router = Router();
const bookController = new BookController();

router.post('/', validatorMiddleware({ body: bookSchema }), bookController.create);

export default router;
