import { BookAPIFindByIDResponse, BookAPIFindByTitleResponse, BookLocalFindByIDResponse, BookLocalFindByTitleResponse } from '../../types/Book';
import FindBookByIdMapper from './FindBookByIdMapper';

class FindBookByTitleMapper {
  // forma como vou retornar os dados
  async toPersistence(persistenceBook: BookAPIFindByTitleResponse) {
    const items: Array<BookLocalFindByIDResponse> = [];

    persistenceBook.items.forEach((item: BookAPIFindByIDResponse) => {
      items.push(FindBookByIdMapper.toPersistence(item));
    });

    const books: BookLocalFindByTitleResponse = {
      totalItems: persistenceBook.totalItems,
      items: items,
    };

    return books;
  }
}

export default new FindBookByTitleMapper();
