import { inject, injectable } from 'tsyringe';
import { User } from '../database/entities/User';
import IUserRepository from '../interfaces/repositories/IUser';
import { UserInterface } from '../interfaces/User';

injectable();
class UserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async create(data: UserInterface): Promise<User> {
        const user = await this.userRepository.createAndSave(data);
        return user;
    }
}

export default UserService;
