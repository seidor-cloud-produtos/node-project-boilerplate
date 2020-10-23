import { inject, injectable } from 'tsyringe';
import Book from '../database/schemas/Book';
import { BookInterface } from '../interfaces/book';
import IBookRepository from '../interfaces/repositories/IBook';

@injectable()
export default class BookController {
    constructor(
        @inject('BookRepository')
        private bookRepository: IBookRepository,
    ) {}

    public async create(book_data: BookInterface): Promise<Book> {
        const book_created = await this.bookRepository.createAndSave(book_data);

        return book_created;
    }
}
