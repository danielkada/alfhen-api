import { Request, Response } from 'express';

import BooksAPI from '../repositories/BooksAPI';

class BookController {
  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const book = await BooksAPI.findById(id);
    if (!book) {
      return response.status(404).json({ error: 'Book not found!' });
    }

    return response.status(200).json(book);
  }

  async findByName(request: Request, response: Response) {
    const { title } = request.params;

    const book = await BooksAPI.findByTitle(title);
    if (!book) {
      return response.status(404).json({ error: 'Book not found!' });
    }

    return response.status(200).json(book);
  }
}

export default new BookController();
