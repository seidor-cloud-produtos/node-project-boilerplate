import Book from '../../database/schemas/Book';
import { BookInterface } from '../book';

export default interface IBookRepository {
    createAndSave(book_data: BookInterface): Promise<Book>;
}
