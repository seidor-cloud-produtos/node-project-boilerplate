import { ObjectID } from 'typeorm';
import { BookInterface } from '../../interfaces/book';

class BookBuilder {
    book: Partial<BookInterface>;

    constructor() {
        this.book = {};
    }

    public withId(id: ObjectID): BookBuilder {
        this.book._id = id;
        return this;
    }

    public withName(name: string): BookBuilder {
        this.book.name = name;
        return this;
    }

    public withAuthor(author: string): BookBuilder {
        this.book.author = author;
        return this;
    }

    public withCreatedAt(createdAt: Date): BookBuilder {
        this.book.createdAt = createdAt;
        return this;
    }

    public withGenre(genre: string): BookBuilder {
        this.book.genre = genre;
        return this;
    }

    public withSubtitle(subtitle: string): BookBuilder {
        this.book.subtitle = subtitle;
        return this;
    }

    public withUpdatedAt(updatedAt: Date): BookBuilder {
        this.book.updatedAt = updatedAt;
        return this;
    }

    public build(): Partial<BookInterface> {
        return this.book;
    }
}

export default BookBuilder;
