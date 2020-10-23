import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import BookController from '../controllers/book';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const book = req.body;

    const bookController = container.resolve(BookController);

    const book_response = await bookController.create(book);

    return res.status(201).send(book_response);
});

export default router;
