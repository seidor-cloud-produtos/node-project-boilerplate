import { FindManyOptions } from 'typeorm';

export const buildGetAllOptions = (params: {
    [key: string]: string;
}): FindManyOptions => {
    const size = params.size || 20;
    const page = params.page || 1;

    const options: FindManyOptions = {
        take: Number(size),
        skip: Number(page) - 1,
    };

    return options;
};
