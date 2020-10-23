import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import BookController from '../controllers/book';
import * as bookValidator from '../utils/book/validators';
import { getValidData } from '../utils/validation/validatonHandler';

const router = Router();

router.post(
    '/',
    bookValidator.createValidators,
    async (req: Request, res: Response) => {
        const { body } = getValidData(req);

        const bookController = container.resolve(BookController);

        const book_response = await bookController.create(body);

        return res.status(201).send(book_response);
    },
);

export default router;
