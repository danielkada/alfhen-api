import axios from 'axios';

import { BookProps } from '../../../types/BookProps';

class APIBookGoogle {
  async findById(id: string): Promise<BookProps | null> {
    try {
      const { data } = await axios.get(`
      https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.API_KEY}
    `);

      const makeResponse = {
        id: data.id,
        title: data.volumeInfo.title,
        authors: data.volumeInfo.authors,
        publishedDate: data.volumeInfo.publishedDate,
        description: data.volumeInfo.description,
        numberOfPages: data.volumeInfo.pageCount,
      };

      return makeResponse;
    } catch {
      return null;
    }
  }
}

export default new APIBookGoogle();
