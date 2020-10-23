import 'reflect-metadata';
import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';

import app from '../../app';
import BookController from '../../controllers/book';
import Book from '../../database/schemas/Book';
import BookBuilder from '../testBuilders/bookBuilder';
import { isParamsInValidationErrors } from '../../utils/validation/validationError';

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

test('POST /api/book/ - BAD REQUEST NO VALUES', async t => {
    const bookControllerSpy = sinon.createStubInstance(BookController);

    const res = await request(app).post('/api/book');

    t.is(res.status, 400);
    t.true(
        isParamsInValidationErrors(
            ['name', 'genre', 'author', 'author'],
            res.body.errors,
        ),
    );
    t.true(bookControllerSpy.create.notCalled);
});

test('POST /api/book/ - BAD REQUEST WRONG VALUES', async t => {
    const data = new BookBuilder()
        .withName(1 as any)
        .withAuthor(1 as any)
        .withGenre(1 as any)
        .withSubtitle(1 as any)
        .build() as Book;

    const bookControllerSpy = sinon.createStubInstance(BookController);

    const res = await request(app).post('/api/book').send(data);

    t.is(res.status, 400);
    t.true(
        isParamsInValidationErrors(
            ['name', 'genre', 'author', 'author'],
            res.body.errors,
        ),
    );
    t.true(bookControllerSpy.create.notCalled);
});
