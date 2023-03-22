import { File } from '../entitites/Files'
import { AppDataSource } from '../data-source'

export const fileRepository = AppDataSource.getRepository(File)
