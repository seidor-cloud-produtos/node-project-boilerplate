import 'reflect-metadata';
import test from 'ava';
import sinon from 'sinon';

import BookController from '../../controllers/book';
import BookRepository from '../../repositories/book';
import Book from '../../database/schemas/Book';

test('create', async t => {
    const data = {
        _id: {},
        author: 'John Doe',
        createdAt: new Date(),
        genre: 'Fake Genre',
        name: 'Fake Name',
        subtitle: 'Fake Subtitle',
        updatedAt: new Date(),
    } as Book;

    const bookRepositoryStub = sinon.createStubInstance(BookRepository);
    bookRepositoryStub.createAndSave.returns(new Promise(resolve => resolve(data)));

    const bookController = new BookController(bookRepositoryStub);

    const response = await bookController.create(data);

    t.deepEqual(response, data);
    t.true(bookRepositoryStub.createAndSave.calledWith(data));
});
