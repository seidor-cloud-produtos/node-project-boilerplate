import { inject, injectable } from 'tsyringe';

import Book from '../database/entities/Book';

import { BookInterface } from '../interfaces/book';
import IBookRepository from '../interfaces/repositories/IBook';

injectable();
class BookService {
    constructor(
        @inject('BookRepository')
        private bookRepository: IBookRepository,
    ) {}

    public async create(bookData: BookInterface): Promise<Book> {
        const book_created = await this.bookRepository.createAndSave(bookData);

        return book_created;
    }
}

export default BookService;
