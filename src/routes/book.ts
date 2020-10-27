import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import BookController from '../controllers/book';
import validateUserDataMiddleware from '../utils/book/middleware/validateBookData';
import { getValidData } from '../utils/validation/validatonHandler';

const router = Router();

router.post('/', validateUserDataMiddleware, async (req: Request, res: Response) => {
    const { body } = getValidData(req);

    const bookController = container.resolve(BookController);

    const book_response = await bookController.create(body);

    return res.status(201).send(book_response);
});

export default router;
