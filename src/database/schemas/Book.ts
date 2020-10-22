import {
    ObjectID,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
} from 'typeorm';

@Entity('books')
export default class Book {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column({ nullable: true })
    subtitle: string;

    @Column()
    author: string;

    @Column()
    genre: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
