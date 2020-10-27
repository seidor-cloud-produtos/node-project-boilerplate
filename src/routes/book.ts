import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import BookController from '../controllers/book';
import validateUserDataMiddleware from '../utils/book/middleware/validateBookData';

const router = Router();

router.post('/', validateUserDataMiddleware, async (req: Request, res: Response) => {
    const book_data = req.body;

    const bookController = container.resolve(BookController);

    const book_response = await bookController.create(book_data);

    return res.status(201).send(book_response);
});

export default router;
