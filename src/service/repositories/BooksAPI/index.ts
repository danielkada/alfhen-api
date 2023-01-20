import { BookAPIFindByIDResponse, BookAPIFindByTitleResponse, BookLocalFindByIDResponse, BookLocalFindByTitleResponse } from '../../../types/Book';

import FindBookByIdMapper from '../../mappers/FindBookByIdMapper';
import FindBookByTitleMapper from '../../mappers/FindBookByTitleMapper';

import APIBookGoogle from './Repository';

class BooksAPIRepository {
  async findById(id: string): Promise<BookLocalFindByIDResponse | null> {
    try {
      const response: BookAPIFindByIDResponse = await APIBookGoogle.find({
        path: `/${id}`
      });

      const book = FindBookByIdMapper.toPersistence(response);
      return book;
    } catch {
      return null;
    }
  }

  async findByTitle(title: string): Promise<BookLocalFindByTitleResponse | null> {
    try {
      const response: BookAPIFindByTitleResponse = await APIBookGoogle.find({
        path: `?q=intitle:${title}&key=${process.env.API_KEY}`
      });

      const books = FindBookByTitleMapper.toPersistence(response);

      return books;
    } catch {
      return null;
    }
  }
}

export = new BooksAPIRepository();
