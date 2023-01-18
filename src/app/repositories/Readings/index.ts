import { Reading } from '../../../database/entities/Reading';

import { ReadingProps } from '../../../types/ReadingsProps';

import { readingsRepository } from './Repository';

interface UpdatedReadingProps {
  userId: string;
  currentPage: number;
}

interface FindReadingProps {
  id: string;
  userId: string;
}

interface FindReadingByBookIdProps {
  userId: string;
  bookId: string;
}

class ReadingsRepository {
  async findAll(userId: string): Promise<Reading[]> {
    const readings = await readingsRepository.findBy({ user_id: userId });

    return readings;
  }

  findById({ id, userId }: FindReadingProps) {
    const reading = readingsRepository.findOneBy({
      id: id,
      user_id: userId,
    });

    return reading;
  }

  findByBookId({ bookId, userId }: FindReadingByBookIdProps) {
    const reading = readingsRepository.findOneBy({
      book_id: bookId,
      user_id: userId,
    });

    return reading;
  }

  async create({ userId, bookId }: ReadingProps) {
    const createdReading = readingsRepository.create({
      user_id: userId,
      book_id: bookId,
    });

    await readingsRepository.save(createdReading);

    return createdReading;
  }

  async update(id: string, { userId, currentPage }: UpdatedReadingProps) {
    const updtedReading = readingsRepository.update(
      { id, user_id: userId },
      { current_page: currentPage }
    );

    return updtedReading;
  }

  async delete({ id, userId }: FindReadingProps) {
    const deletedReading = readingsRepository.delete({ id, user_id: userId});

    return deletedReading;
  }
}

export default new ReadingsRepository();
