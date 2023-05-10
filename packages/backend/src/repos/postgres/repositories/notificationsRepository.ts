import { AppDataSource } from '../../../database/data-source';
import { Notifications } from '../entitites/Notifications';

export const notificationsRepository = AppDataSource.getRepository(Notifications);