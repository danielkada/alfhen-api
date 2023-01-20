import APIBookGoogle from './Repository';

interface FindByIdResponse {
  items: [
    {
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
  ]
}

interface FindByTitleResponse {
  totalItems: number;
  items: Array<FindByIdResponse>
}

interface MakeResponseSearchId {
  id: string;
  title: string;
  subtitle: string | null;
  authors: string;
  publishedDate: string | null;
  description: string;
  numberOfPages: number;
  imageURL: string | null;
}

interface MakeResponseSearchTitle {
  totalItems: number;
  items: Array<MakeResponseSearchId>
}

class BooksAPIRepository {
  async findById(id: string): Promise<MakeResponseSearchId | null> {
    try {
      const response: Promise<FindByIdResponse> = APIBookGoogle.find({
        path: `?q=${id}&key=${process.env.API_KEY}`
      });

      const [volume] = (await response).items;

      const makeResponse: MakeResponseSearchId = {
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

  async findByTitle(title: string): Promise<MakeResponseSearchTitle | null> {
    try {
      const response: Promise<FindByTitleResponse> = await APIBookGoogle.find({
        path: `?q=intitle:${title}&key=${process.env.API_KEY}`
      });

      const volumes = (await response);

      const items: Array<MakeResponseSearchId> = [];

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

      const makeResponse: MakeResponseSearchTitle = {
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
