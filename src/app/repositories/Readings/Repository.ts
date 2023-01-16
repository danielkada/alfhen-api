import { AppDataSource } from '../../../database/data-source';
import { Reading } from '../../../database/entities/Reading';

export const readingsRepository = AppDataSource.getRepository(Reading);
