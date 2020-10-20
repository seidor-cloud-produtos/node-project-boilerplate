import {
    getRepository,
    createQueryBuilder,
    DeleteResult,
    FindManyOptions,
} from 'typeorm';
import { User } from '../database/entities/User';
import { UserInterface } from '../interfaces/user';

export const create = async (data: UserInterface): Promise<UserInterface> => {
    const user = Object.assign(new User(), data);

    return getRepository(User).save(user);
};

export const getById = async (id: string): Promise<User | undefined> => {
    return getRepository(User).findOne({ id });
};

export const getAll = async (
    options?: FindManyOptions,
): Promise<{ data: UserInterface[]; count: number }> => {
    const [data, count] = await getRepository(User).findAndCount(options);

    return { data, count };
};

export const update = async (
    data: Partial<UserInterface>,
    id: string,
): Promise<UserInterface> => {
    const updateRes = await createQueryBuilder()
        .update(User, Object.assign(new User(), data))
        .where({ id })
        .returning('*')
        .execute();

    return updateRes.raw[0];
};

export const remove = async (id: string): Promise<DeleteResult> => {
    return getRepository(User).delete({ id });
};
