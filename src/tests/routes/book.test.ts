import 'reflect-metadata';
import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';

import app from '../../app';
import BookController from '../../controllers/book';
import Book from '../../database/schemas/Book';
import BookBuilder from '../testBuilders/bookBuilder';

test('POST /api/book/', async t => {
    const data = new BookBuilder()
        .withName('John Doe Biography')
        .withAuthor('John Doe')
        .withGenre('Comedy')
        .withSubtitle('Auto Biography')
        .build() as Book;

    const bookControllerSpy = sinon.createStubInstance(BookController);
    bookControllerSpy.create.returns(new Promise(resolve => resolve(data)));

    sinon.stub(container, 'resolve').returns(bookControllerSpy);

    const res = await request(app).post('/api/book').send(data);

    t.is(res.status, 201);
    t.true(bookControllerSpy.create.calledWith(data));
});
