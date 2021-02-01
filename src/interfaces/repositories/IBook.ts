import Book from '../../database/entities/Book';
import { BookInterface } from '../book';

export default interface IBookRepository {
    createAndSave(book_data: BookInterface): Promise<Book>;
}
