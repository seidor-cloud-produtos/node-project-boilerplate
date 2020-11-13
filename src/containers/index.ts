import { container } from 'tsyringe';

import IBookRepository from '../interfaces/repositories/IBook';
import BookRepository from '../repositories/book';

container.registerSingleton<IBookRepository>('BookRepository', BookRepository);
