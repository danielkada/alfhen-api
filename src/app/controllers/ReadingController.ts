import { Request, Response } from 'express';
import { isValidUUID } from '../../utils/isValidUUID';

import ReadingsRepository from '../repositories/Readings';
import UsersRepository from '../repositories/Users';
import APIBookGoogle from '../../service/repositories/BooksAPI';
import BooksRepository from '../repositories/Books';

class ReadingController {
  async index(request: Request, response: Response) {
    const { id } = request.user;

    const readings = await ReadingsRepository.findAll(id);

    return response.status(200).json(readings);
  }

  async show(request: Request, response: Response) {
    const { id: userId } = request.user;
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid reading id' });
    }

    if (!isValidUUID(userId)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }

    const user = await UsersRepository.findById(userId);
    if (!user) {
      return response.status(404).json({ error: 'User does not exists!' });
    }

    const reading = await ReadingsRepository.findById({
      id,
      userId,
    });
    if (!reading) {
      return response.status(404).json({ error: 'Reading does not exists!' });
    }

    return response.status(200).json(reading);
  }

  async store(request: Request, response: Response) {
    const { id } = request.user;
    const { book_id, current_page } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }

    const user = await UsersRepository.findById(id);
    if (!user) {
      return response.status(404).json({ error: 'User does not exists!' });
    }

    const reading = await ReadingsRepository.findByBookId({
      bookId: book_id,
      userId: id
    });
    if (reading) {
      return response.status(400).json({ error: 'This book is already registered in your readings!' });
    }

    const book = await BooksRepository.findById(book_id);
    if (!book) {
      const bookAPI = await APIBookGoogle.findById(book_id);
      if (!bookAPI) {
        return response.status(404).json({ error: 'Book not found!' });
      }

      if (current_page >  bookAPI.numberOfPages) {
        return response.status(400).json({ error: 'The current page number cannot exceed the number of pages!' });
      }

      await BooksRepository.create({
        id: bookAPI.id,
        title: bookAPI.title,
        subtitle: bookAPI.subtitle || null,
        authors: bookAPI.authors,
        publishedDate: bookAPI.publishedDate || null,
        description: bookAPI.description,
        numberOfPages: bookAPI.numberOfPages,
        imageURL: bookAPI.imageURL || null,
      });
    }

    const createdReading = await ReadingsRepository.create({
      userId: id,
      bookId: book_id,
      currentPage: current_page || 0,
    });

    return response.status(201).json(createdReading);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { id: userId } = request.user;
    const { current_page } = request.body;

    if(!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid reading id' });
    }

    if(!isValidUUID(userId)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }

    if (!current_page) {
      return response.status(400).json({ error: 'Current page is required!' });
    }

    const user = await UsersRepository.findById(userId);
    if (!user) {
      return response.status(404).json({ error: 'User does not exists!' });
    }

    const reading = await ReadingsRepository.findById({ id, userId });
    if (!reading) {
      return response.status(404).json({ error: 'Reading does not exists!' });
    }

    const book = await BooksRepository.findById(reading.book_id);
    if (book) {
      if (current_page > book.numberOfPages) {
        return response.status(400).json({ error: 'The current page number cannot exceed the number of pages!' });
      }
    }

    await ReadingsRepository.update(id, {
      userId,
      currentPage: current_page
    });

    return response.sendStatus(204);
  }

  async delete(request: Request, response: Response) {
    const { id: userId } = request.user;
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid reading id' });
    }

    if (!isValidUUID(userId)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }

    const user = await UsersRepository.findById(userId);
    if (!user) {
      return response.status(404).json({ error: 'User does not exists!' });
    }

    const reading = await ReadingsRepository.findById({
      id,
      userId,
    });
    if (!reading) {
      return response.status(404).json({ error: 'Reading does not exists!' });
    }

    await ReadingsRepository.delete({ id, userId });

    return response.sendStatus(204);
  }
}

export default new ReadingController();
