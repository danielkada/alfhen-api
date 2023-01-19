import { AppDataSource } from '../../../database/data-source';

import { Book } from '../../../database/entities/Book';

export const booksRepository = AppDataSource.getRepository(Book);
