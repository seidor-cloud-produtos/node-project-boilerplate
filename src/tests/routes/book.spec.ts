import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';
import app from '../../app';
import BookController from '../../controllers/book';
import Book from '../../database/schemas/Book';
import BookBuilder from '../testBuilders/bookBuilder';

describe('Book Route context', () => {
    let bookControllerSpy: sinon.SinonStubbedInstance<BookController>;

    beforeEach(() => {
        sinon.restore();
        bookControllerSpy = sinon.createStubInstance(BookController);
    });

    it('should be call controller with book data and returns status 201', async () => {
        const book_data = new BookBuilder()
            .withName('John Doe Biography')
            .withAuthor('John Doe')
            .withGenre('Comedy')
            .withSubtitle('Auto Biography')
            .build() as Book;

        bookControllerSpy.create.returns(new Promise(resolve => resolve(book_data)));
        sinon.stub(container, 'resolve').returns(bookControllerSpy);

        const res = await request(app).post('/api/book').send(book_data);

        expect(res.status).toBe(201);
        expect(bookControllerSpy.create.calledWith(book_data)).toBeTruthy();
    });

    it('should be return status 400 when not send params', async () => {
        sinon.stub(container, 'resolve').returns(bookControllerSpy);

        const res = await request(app).post('/api/book');

        expect(res.status).toBe(400);
        expect(bookControllerSpy.create.notCalled).toBeTruthy();
    });

    it('should be return status 400 when send invalid params', async () => {
        const book_data = new BookBuilder()
            .withName(1 as any)
            .withAuthor(1 as any)
            .withGenre(1 as any)
            .withSubtitle(1 as any)
            .build() as Book;

        sinon.stub(container, 'resolve').returns(bookControllerSpy);

        const res = await request(app).post('/api/book').send(book_data);

        expect(res.status).toBe(400);
        expect(bookControllerSpy.create.notCalled).toBeTruthy();
    });
});
