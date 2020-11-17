import { Router } from 'express';

import validateUserDataMiddleware from '../utils/book/middleware/validateBookData';

import BookController from '../controllers/book';

const router = Router();
const bookController = new BookController();

router.post('/', validateUserDataMiddleware, bookController.create);

export default router;
