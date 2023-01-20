import { BookAPIFindByIDResponse } from '../../types/Book';


class FindBookByIdMapper {
  // forma como vou retornar os dados
  toPersistence(persistenceBook: BookAPIFindByIDResponse) {
    return {
      id: persistenceBook.id,
      title: persistenceBook.volumeInfo.title,
      subtitle: persistenceBook.volumeInfo.subtitle || null,
      authors: persistenceBook.volumeInfo.authors,
      publishedDate: persistenceBook.volumeInfo.publishedDate || null,
      description: persistenceBook.volumeInfo.description,
      numberOfPages: persistenceBook.volumeInfo.pageCount,
      imageURL: persistenceBook.volumeInfo.imageLinks?.smallThumbnail
        ? persistenceBook.volumeInfo.imageLinks?.thumbnail
        : null
    };
  }
}

export default new FindBookByIdMapper();
