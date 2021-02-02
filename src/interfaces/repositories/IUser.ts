import { User } from '../../database/entities/User';
import { UserInterface } from '../User';

export default interface IUserRepository {
    createAndSave(data: UserInterface): Promise<User>;
}
