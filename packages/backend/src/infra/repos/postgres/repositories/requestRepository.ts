import { AppDataSource } from '../../../database/data-source'
import { Request } from '../entitites/Request'

export const requestRepository = AppDataSource.getRepository(Request)
