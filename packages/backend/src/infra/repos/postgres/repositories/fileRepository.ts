import { File } from '../entitites/Files'
import { AppDataSource } from '../../../database/data-source'

export const fileRepository = AppDataSource.getRepository(File)
