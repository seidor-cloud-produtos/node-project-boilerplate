import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';

import BookController from '../controllers/book';
import { bookSchema } from '../utils/book/validators';
import validatorMiddleware from '../utils/middleware/validator';

const router = Router();

router.post(
    '/',
    validatorMiddleware({ body: bookSchema }),
    async (req: Request, res: Response) => {
        const book_data = req.body;

        const bookController = container.resolve(BookController);

        const book_response = await bookController.create(book_data);

        return res.status(201).send(book_response);
    },
);

export default router;
