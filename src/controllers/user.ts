import { User } from '../database/entities/User';
import { UserInterface } from '../interfaces/user';
import { HttpError } from '../utils/errors/HttpError';
import * as repository from '../repositories/user';
import { buildGetAllOptions } from '../utils/typeorm';

export const create = async (data: UserInterface): Promise<UserInterface> => {
    return repository.create(data);
};

export const getById = async (id: string): Promise<User | HttpError> => {
    const user = await repository.getById(id);

    if (!user) throw new HttpError(404, 'User not found');

    return user;
};

export const getAll = async (params: { [key: string]: string }) => {
    const options = buildGetAllOptions(params);

    return repository.getAll(options);
};

export const update = async (
    data: Partial<UserInterface>,
    id: string,
): Promise<UserInterface | HttpError> => {
    const user = repository.update(data, id);

    if (!user) throw new HttpError(404, 'User not found');

    return user;
};

export const remove = async (id: string): Promise<void | HttpError> => {
    const result = await repository.remove(id);

    if (result.affected === 0) throw new HttpError(404, 'User not found');
};
