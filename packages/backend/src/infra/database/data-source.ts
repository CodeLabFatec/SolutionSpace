import { DataSource } from 'typeorm'
import 'dotenv/config'
import 'reflect-metadata'
import { User } from '../repos/postgres/entitites/User'
import { File } from '../repos/postgres/entitites/Files'
import { Team } from '../repos/postgres/entitites/Team'
import { Request } from '../repos/postgres/entitites/Request'
import { Rating } from '../repos/postgres/entitites/Rating'
import { default1680224074647 } from './migrations/1680224074647-default'

const DB_PORT = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: [User, File, Team, Request, Rating],
  migrations: [default1680224074647],
  maxQueryExecutionTime: 2000
})
