import 'reflect-metadata';
import test from 'ava';
import sinon from 'sinon';
import { container } from 'tsyringe';

import BookController from '../../controllers/book';
import BookRepository from '../../repositories/book';
import { BookInterface } from '../../interfaces/book';

test('create', async t => {
    const data = {
        _id: {},
        author: 'John Doe',
        createdAt: new Date(),
        genre: 'Fake Genre',
        name: 'Fake Name',
        subtitle: 'Fake Subtitle',
        updatedAt: new Date(),
    } as BookInterface;

    const bookRepositoryStub = sinon.createStubInstance(BookRepository);
    bookRepositoryStub.createAndSave.returns(new Promise(resolve => resolve(data)));

    const bookController = new BookController(bookRepositoryStub);

    const response = await bookController.create(data);

    t.deepEqual(response, data);
    t.true(bookRepositoryStub.createAndSave.calledWith(data));
});
