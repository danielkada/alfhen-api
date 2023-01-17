import { Request, Response } from 'express';
import BooksRepository from '../repositories/BooksRepository';

class BookController {
  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const book = await BooksRepository.findById(id);
    if (!book) {
      return response.status(404).json({ error: 'Book not found!' });
    }

    return response.status(200).json(book);

  }
}

export default new BookController();
