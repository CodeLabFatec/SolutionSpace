import { AppDataSource } from '../../../database/data-source'
import { Group } from '../entitites/Group'

export const groupRepository = AppDataSource.getRepository(Group)
