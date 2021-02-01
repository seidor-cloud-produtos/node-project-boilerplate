import { MongoRepository, getMongoRepository } from 'typeorm';
import IBookRepository from '../interfaces/repositories/IBook';
import Book from '../database/schemas/Book';
import { BookInterface } from '../interfaces/book';

export default class BookRepository implements IBookRepository {
    private ormRepository: MongoRepository<Book>;

    constructor() {
        this.ormRepository = getMongoRepository(Book, 'mongo');
    }

    public async createAndSave(book_data: BookInterface): Promise<Book> {
        const book = this.ormRepository.create(book_data);

        return this.ormRepository.save(book);
    }
}
