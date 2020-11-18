import { Response, Request } from 'express';
import { container } from 'tsyringe';

import BookService from '../services/book';

export const create = async (req: Request, res: Response): Promise<Response> => {
    const bookData = req.body;

    const bookService = container.resolve(BookService);
    const response = await bookService.create(bookData);

    return res.status(201).json(response);
};
