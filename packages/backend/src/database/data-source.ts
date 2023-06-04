import { DataSource } from 'typeorm';
import 'dotenv/config';
import 'reflect-metadata';
import { User } from '../repos/postgres/entitites/User';
import { File } from '../repos/postgres/entitites/File';
import { Team } from '../repos/postgres/entitites/Team';
import { Request } from '../repos/postgres/entitites/Request';
import { Rating } from '../repos/postgres/entitites/Rating';
import { StatusConfiguration } from '../repos/postgres/entitites/StatusConfiguration';
import { Group } from '../repos/postgres/entitites/Group';
import { Notifications } from '../repos/postgres/entitites/Notifications';
import { Kanban } from '../repos/postgres/entitites/Kanban';
import { default1685899725962 } from './migrations/1685899725962-default';

const DB_PORT = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: [User, File, Team, Request, Rating, StatusConfiguration, Group, Notifications, Kanban],
    migrations: [default1685899725962],
    maxQueryExecutionTime: 2000
});