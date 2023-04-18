import { User } from '../entitites/User';
import { AppDataSource } from '../../../database/data-source';

export const userRepository = AppDataSource.getRepository(User);