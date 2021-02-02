import { getConnection } from 'typeorm';
import BookRepository from '../../repositories/book';
import connect from '../../database/connection/connection';
import BookBuilder from '../testBuilders/bookBuilder';
import { BookInterface } from '../../interfaces/book';

describe('Book Repository context', () => {
    let bookRepository: BookRepository;

    beforeEach(async () => {
        await connect(true);
        bookRepository = new BookRepository();
    });

    afterAll(done => {
        getConnection().close();
        done();
    });

    it('should be able to insert a new book', async done => {
        const book_data = new BookBuilder()
            .withAuthor('John Doe')
            .withGenre('Autobiography')
            .withName('John Doe Biography')
            .withSubtitle(`John Doe's life and death`)
            .build();

        const {
            author,
            genre,
            name,
            subtitle,
            _id,
        } = await bookRepository.createAndSave(book_data as BookInterface);

        expect(author).toBe(book_data.author);
        expect(genre).toBe(book_data.genre);
        expect(name).toBe(book_data.name);
        expect(subtitle).toBe(book_data.subtitle);
        expect(_id).not.toBeUndefined();
        done();
    });
});
