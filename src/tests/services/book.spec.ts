import FakeBookRepository from '../repositories/fakes/FakeBookRepository';
import BookService from '../../services/book';

describe('Book', () => {
    it('should be able to create a new book', async () => {
        const fakeBookRepository = new FakeBookRepository();
        const createBook = new BookService(fakeBookRepository);

        const book = await createBook.create({
            name: 'TI FULL',
            subtitle: 'Test create new book',
            author: 'Pablo',
            genre: 'ANY',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        expect(book).toHaveProperty('name');
    });
});
