import IBookRepository from '../../../interfaces/repositories/IBook';
import Book from '../../../database/entities/Book';
import { BookInterface } from '../../../interfaces/book';

export default class BookRepository implements IBookRepository {
    private books: BookInterface[] = [];

    public async createAndSave(bookData: BookInterface): Promise<Book> {
        const book = new Book();

        Object.assign(book, bookData);

        this.books.push(book);

        return book;
    }
}
