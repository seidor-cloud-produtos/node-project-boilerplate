import { Response, Request } from 'express';
import { container } from 'tsyringe';

import BookService from '../services/book';

export default class BookController {
    bookService: BookService;

    constructor() {
        this.bookService = container.resolve(BookService);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const book_data = request.body;

        const book_response = await this.bookService.create(book_data);

        return response.status(201).json(book_response);
    }
}
