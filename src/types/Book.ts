export interface BookCreateProps {
  id: string;
  title: string;
  subtitle: string | null;
  authors: string;
  publishedDate: string | null;
  description: string;
  numberOfPages: number;
  imageURL: string | null;
}

export interface BookAPIFindByIDResponse {
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

export interface BookAPIFindByIDResponse {
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

export interface BookAPIFindByTitleResponse {
  totalItems: number;
  items: Array<BookAPIFindByIDResponse>
}

export interface BookLocalFindByIDResponse {
  id: string;
  title: string;
  subtitle: string | null;
  authors: string;
  publishedDate: string | null;
  description: string;
  numberOfPages: number;
  imageURL: string | null;
}

export interface BookLocalFindByTitleResponse {
  totalItems: number;
  items: Array<BookLocalFindByIDResponse>
}
