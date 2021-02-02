import { container } from 'tsyringe';

import IBookRepository from '../interfaces/repositories/IBook';
import BookRepository from '../repositories/book';
import UserRepository from '../repositories/user';

container.registerSingleton<IBookRepository>('BookRepository', BookRepository);
container.registerSingleton<UserRepository>('UserRepository', UserRepository);
