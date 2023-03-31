import { Router, Express } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  readdirSync(join(__dirname, '../routes')).map(async (file) => {
    ;(await import(`../routes/${file}`)).default(router)
  })

  app.use('/api', router)
}
