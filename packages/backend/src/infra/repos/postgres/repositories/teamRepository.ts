import { AppDataSource } from '../../../database/data-source'
import { Team } from '../entitites/Team'

export const teamRepository = AppDataSource.getRepository(Team)
