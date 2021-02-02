import { UserInterface } from '../../interfaces/User';
import UserService from '../../services/user';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UserBuilder from '../testBuilders/userBuilder';

describe('Book', () => {
    it('should be able to create a new book', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createBook = new UserService(fakeUserRepository);

        const user = new UserBuilder()
            .withId('4e3f95d1-b029-466b-91fc-9eca0dbc8248')
            .withName('Jonh Joe')
            .withSurname('Silva')
            .withEmail('jonhjoe.silva@email.com')
            .withCreatedAt(new Date())
            .withUpdatedAt(new Date())
            .build();

        const result = await createBook.create(user as UserInterface);

        expect(result).toHaveProperty('name');
    });
});
