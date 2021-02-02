import { getConnection } from 'typeorm';
import connect from '../../database/connection/connection';
import UserRepository from '../../repositories/user';
import UserBuilder from '../testBuilders/userBuilder';
import { UserInterface } from '../../interfaces/User';

describe('User Repository context', () => {
    let userRepository: UserRepository;

    beforeEach(async () => {
        await connect(true);
        userRepository = new UserRepository();
    });

    afterAll(done => {
        getConnection().close();
        done();
    });

    it('should be able to insert a new user', async done => {
        const data = new UserBuilder()
            .withName('John Doe')
            .withSurname('Jonh')
            .withEmail('jonhjoe@email.com')
            .withAge(99)
            .build();

        const user = await userRepository.createAndSave(data as UserInterface);

        expect(user.name).toBe(data.name);
        expect(user.surname).toBe(data.surname);
        expect(user.age).toBe(data.age);
        expect(user.id).not.toBeUndefined();
        expect(user.createdAt).not.toBeUndefined();
        expect(user.updatedAt).not.toBeUndefined();
        done();
    });
});
