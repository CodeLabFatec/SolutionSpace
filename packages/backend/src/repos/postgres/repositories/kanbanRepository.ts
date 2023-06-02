import { AppDataSource } from '../../../database/data-source';
import { Kanban } from '../entitites/Kanban';

export const kanbanRepository = AppDataSource.getRepository(Kanban);