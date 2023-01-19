import { BookProps } from '../../../types/BookProps';
import { booksRepository } from './Repository';

class BooksRepository {
  async findById(id: string) {
    const book = await booksRepository.findOneBy({ id });

    return book;
  }

  async create({
    id,
    title,
    authors,
    publishedDate,
    description,
    numberOfPages
  }: BookProps) {
    const createdBook = booksRepository.create({
      id,
      title,
      authors,
      publishedDate,
      description,
      numberOfPages,
    });

    await booksRepository.save(createdBook);
  }
}

export = new BooksRepository();
