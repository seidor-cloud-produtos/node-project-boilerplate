import { ObjectID } from 'typeorm';

export interface BookInterface {
    _id: ObjectID;

    name: string;

    subtitle: string;

    author: string;

    genre: string;

    createdAt: Date;

    updatedAt: Date;
}
