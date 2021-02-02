import { Repository, getRepository } from 'typeorm';
import { User } from '../database/entities/User';
import IUserRepository from '../interfaces/repositories/IUser';
import { UserInterface } from '../interfaces/User';

export default class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async createAndSave(data: UserInterface): Promise<User> {
        const book = this.ormRepository.create(data);
        return this.ormRepository.save(book);
    }
}
