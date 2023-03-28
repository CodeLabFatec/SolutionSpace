import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { userRepository } from '../../infra/repos/postgres/repositories/userRepository'

type JwtPayload = {
  id: number
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) return res.status(401).json('Authorization not found')

  try {
    const { id } = jwt.verify(authorization.split(' ')[1], process.env.JWT_PASS ?? '') as JwtPayload

    const user = await userRepository.findOneBy({ user_id: id })

    if (!user) {
      return res.status(401).json('User not found')
    }

    res.locals = {
      user_id: id,
      user_name: user.name,
      team_id: user.team
    }

    next()
  } catch {
    return res.status(401).json('Authorization Error')
  }
}
