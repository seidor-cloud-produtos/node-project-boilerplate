import { User } from '../../../database/entities/User';
import { UserInterface } from '../../../interfaces/User';
import IUserRepository from '../../../interfaces/repositories/IUser';

export default class UserRepository implements IUserRepository {
    private users: UserInterface[] = [];

    public async createAndSave(data: UserInterface): Promise<User> {
        const user = new User();

        Object.assign(user, data);

        this.users.push(user);

        return user;
    }
}
