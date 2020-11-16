import { Response, Request } from 'express';
import { container } from 'tsyringe';

import BookService from '../services/book';

export default class BookController {
    public async create(request: Request, response: Response): Promise<Response> {
        const book_data = request.body;

        const bookService = container.resolve(BookService);

        const book_response = await bookService.create(book_data);

        return response.status(201).json(book_response);
    }
}
