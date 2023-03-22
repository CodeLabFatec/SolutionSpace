import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
import cors from 'cors'

AppDataSource.initialize()
  .then(() => {
    console.log(`Data Source has been initialized on PORT ${process.env.DB_PORT}`)

    const app = express()

    app.use(express.json())
    app.use(routes)
    app.use(cors())

    app.listen(process.env.PORT, () => console.log(`Server started at http://localhost:${process.env.PORT}`))
  })
  .catch((err) => {
    console.error('Data Source initialization erro', err)
  })
