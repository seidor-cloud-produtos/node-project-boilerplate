import sinon from 'sinon';
import BookController from '../../controllers/book';
import Book from '../../database/schemas/Book';
import { BookInterface } from '../../interfaces/book';
import BookRepository from '../../repositories/book';
import BookBuilder from '../testBuilders/bookBuilder';

describe('Book Controller context', () => {
    let bookController: BookController;
    let bookRepositorySpy: sinon.SinonStubbedInstance<BookRepository>;

    beforeEach(() => {
        sinon.restore();
        bookRepositorySpy = sinon.createStubInstance(BookRepository);
        bookController = new BookController(bookRepositorySpy);
    });

    it('Should be able to call repository with data of book', async () => {
        const book_data = new BookBuilder()
            .withAuthor('John Doe')
            .withGenre('Autobiography')
            .withName('John Doe Biography')
            .withSubtitle(`John Doe's life and death`)
            .build();

        bookRepositorySpy.createAndSave.returns(
            new Promise(resolve => resolve(book_data as Book)),
        );

        const book_controller_response = await bookController.create(
            book_data as BookInterface,
        );

        expect(
            bookRepositorySpy.createAndSave.calledWithExactly(
                book_data as BookInterface,
            ),
        ).toBeTruthy();

        expect(book_controller_response).toEqual(book_data);
    });
});
