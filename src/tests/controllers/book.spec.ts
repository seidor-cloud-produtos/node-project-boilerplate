import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';

import app from '../../app';
import BookService from '../../services/book';
import Book from '../../database/schemas/Book';
import BookBuilder from '../testBuilders/bookBuilder';

describe('Book Route context', () => {
    let bookServiceSpy: sinon.SinonStubbedInstance<BookService>;

    beforeEach(() => {
        sinon.restore();
        bookServiceSpy = sinon.createStubInstance(BookService);
    });

    it('should be call controller with book data and returns status 201', async () => {
        const bookData = new BookBuilder()
            .withName('John Doe Biography')
            .withAuthor('John Doe')
            .withGenre('Comedy')
            .withSubtitle('Auto Biography')
            .build() as Book;

        bookServiceSpy.create.resolves(<any>bookData);
        sinon.stub(container, 'resolve').returns(bookServiceSpy);

        const res = await request(app).post('/api/book').send(bookData);

        expect(res.status).toBe(201);
        expect(res.body).toStrictEqual(bookData);
        expect(bookServiceSpy.create.calledWithExactly(bookData)).toBeTruthy();
    });

    it('should be return status 400 when not send params', async () => {
        sinon.stub(container, 'resolve').returns(bookServiceSpy);

        const res = await request(app).post('/api/book');

        expect(res.status).toBe(400);
        expect(bookServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be return status 400 when send invalid params', async () => {
        const bookData = new BookBuilder()
            .withName(1 as any)
            .withAuthor(1 as any)
            .withGenre(1 as any)
            .withSubtitle(1 as any)
            .build() as Book;

        sinon.stub(container, 'resolve').returns(bookServiceSpy);

        const res = await request(app).post('/api/book').send(bookData);

        expect(res.status).toBe(400);
        expect(bookServiceSpy.create.notCalled).toBeTruthy();
    });
});
