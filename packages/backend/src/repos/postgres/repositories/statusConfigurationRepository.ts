import { AppDataSource } from '../../../database/data-source';
import { StatusConfiguration } from '../entitites/StatusConfiguration';

export const statusConfigurationRepository = AppDataSource.getRepository(StatusConfiguration);