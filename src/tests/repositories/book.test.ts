import test from 'ava';

import connect from '../../database/connection/connection';
import { BookInterface } from '../../interfaces/book';
import BookRepository from '../../repositories/book';

let bookRepository: BookRepository;

test.before(async () => {
    await connect();

    bookRepository = new BookRepository();
});

test.serial('should be insert a new book in collection of mongo', async t => {
    const book_data = {
        author: 'John Doe',
        genre: 'Fake John Doe genre',
        name: 'John Doe',
        subtitle: 'Doe',
    } as BookInterface;

    const {
        author,
        genre,
        name,
        subtitle,
        _id,
    } = await bookRepository.createAndSave(book_data);

    t.is(book_data.author, author);
    t.is(book_data.genre, genre);
    t.is(book_data.name, name);
    t.is(book_data.subtitle, subtitle);

    t.truthy(_id);
});
