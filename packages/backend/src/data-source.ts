import { DataSource } from 'typeorm'
import 'dotenv/config'
import 'reflect-metadata'
import { User } from './entitites/User'
import { File } from './entitites/Files'
import { Group } from './entitites/Group'
import { Request } from './entitites/Request'
import { default1679514590891 } from './migrations/1679514590891-default'
import { default1679516032411 } from './migrations/1679516032411-default'

const DB_PORT = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: [User, File, Group, Request],
  migrations: [default1679514590891, default1679516032411],
  maxQueryExecutionTime: 2000
})
