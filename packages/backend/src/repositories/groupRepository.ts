import { AppDataSource } from '../data-source'
import { Group } from '../entitites/Group'

export const groupRepository = AppDataSource.getRepository(Group)
