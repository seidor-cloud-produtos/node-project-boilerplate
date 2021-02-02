import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UserService from '../services/user';

export const create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const userService = container.resolve(UserService);
    const response = await userService.create(body);

    return res.status(201).json(response);
};
