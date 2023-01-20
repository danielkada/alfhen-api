import { BookCreateProps } from '../../../types/BookProps';

import { booksRepository } from './Repository';

class BooksRepository {
  async findById(id: string) {
    const book = await booksRepository.findOneBy({ id });

    return book;
  }

  async create({
    id,
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    numberOfPages,
    imageURL,
  }: BookCreateProps) {
    const createdBook = booksRepository.create({
      id,
      title,
      subtitle,
      authors,
      publishedDate,
      description,
      numberOfPages,
      imageURL,
    });

    await booksRepository.save(createdBook);
  }
}

export = new BooksRepository();
