import { File } from '../entitites/File';
import { AppDataSource } from '../../../database/data-source';

export const fileRepository = AppDataSource.getRepository(File);