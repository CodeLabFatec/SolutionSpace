import { AppDataSource } from '../../../database/data-source'
import { Rating } from '@/infra/repos/postgres/entitites/Rating'

export const ratingRepository = AppDataSource.getRepository(Rating)
