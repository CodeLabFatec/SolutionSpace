import { AppDataSource } from '../../../database/data-source';
import { Rating } from '../entitites/Rating';

export const ratingRepository = AppDataSource.getRepository(Rating);