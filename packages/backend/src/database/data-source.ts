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
import { default1683563067834 } from './migrations/1683563067834-default';
import { default1683587853299 } from './migrations/1683587853299-default';
import { default1683669903631 } from './migrations/1683669903631-default';
import { default1683768998450 } from './migrations/1683768998450-default';
import { default1683804275779 } from './migrations/1683804275779-default';
import { default1683810603833 } from './migrations/1683810603833-default';
import { default1683813798806 } from './migrations/1683813798806-default';

const DB_PORT = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: [User, File, Team, Request, Rating, StatusConfiguration, Group, Notifications],
    migrations: [default1683587853299, default1683669903631, default1683768998450],
    entities: [Group, User, File, Team, Request, Rating, StatusConfiguration, Notifications],
    migrations: [default1683587853299, default1683669903631, default1683804275779, default1683810603833,
         default1683813798806],
    maxQueryExecutionTime: 2000
});