import { AppDataSource } from '../data-source'
import { Request } from '../entitites/Request'

export const requestRepository = AppDataSource.getRepository(Request)
