import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { userRepository } from '../repositories/userRepository'

type JwtPayload = {
  id: number
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) return res.sendStatus(401)

  try {
    const { id } = jwt.verify(authorization.split(' ')[1], process.env.JWT_PASS ?? '') as JwtPayload

    const user = await userRepository.findOneBy({ user_id: id })

    if (!user) {
      return res.sendStatus(401)
    }

    res.locals = { user_id: id }

    next()
  } catch {
    return res.sendStatus(401)
  }
}
