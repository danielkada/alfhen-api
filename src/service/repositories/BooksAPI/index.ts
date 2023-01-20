import { BookAPIFindByIDResponse, BookAPIFindByTitleResponse, BookLocalFindByIDResponse, BookLocalFindByTitleResponse } from '../../../types/Book';
import APIBookGoogle from './Repository';

export interface BookInLoop {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string | null;
    authors: string;
    publishedDate: string | null;
    description: string;
    pageCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  }
}

class BooksAPIRepository {
  async findById(id: string): Promise<BookLocalFindByIDResponse | null> {
    try {
      const response: Promise<BookAPIFindByIDResponse> = APIBookGoogle.find({
        path: `?q=${id}&key=${process.env.API_KEY}`
      });

      const [volume] = (await response).items;

      const makeResponse: BookLocalFindByIDResponse = {
        id: volume.id,
        title: volume.volumeInfo.title,
        subtitle: volume.volumeInfo.subtitle || null,
        authors: volume.volumeInfo.authors,
        publishedDate: volume.volumeInfo.publishedDate || null,
        description: volume.volumeInfo.description,
        numberOfPages: volume.volumeInfo.pageCount,
        imageURL: volume.volumeInfo.imageLinks.smallThumbnail
          ? volume.volumeInfo.imageLinks.thumbnail
          : null
      };

      return makeResponse;
    } catch {
      return null;
    }
  }

  async findByTitle(title: string): Promise<BookLocalFindByTitleResponse | null> {
    try {
      const response: Promise<BookAPIFindByTitleResponse> = await APIBookGoogle.find({
        path: `?q=intitle:${title}&key=${process.env.API_KEY}`
      });

      const volumes = (await response);

      const items: Array<BookLocalFindByIDResponse> = [];

      volumes.items.forEach((item: any) => {
        items.push({
          id: item.id,
          title: item.volumeInfo.title,
          subtitle: item.volumeInfo.subtitle || null,
          authors: item.volumeInfo.authors,
          publishedDate: item.volumeInfo.publishedDate,
          description: item.volumeInfo.description,
          numberOfPages: item.volumeInfo.pageCount,
          imageURL: item.volumeInfo.imageLinks?.smallThumbnail
            ? item.volumeInfo.imageLinks?.thumbnail
            : null
        });
      });

      const makeResponse: BookLocalFindByTitleResponse = {
        totalItems: volumes.totalItems,
        items: items,

      };

      return makeResponse;
    } catch {
      return null;
    }
  }
}

export = new BooksAPIRepository();
