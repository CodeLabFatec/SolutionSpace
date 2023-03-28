import { teamRepository } from '../../infra/repos/postgres/repositories/teamRepository'
import { userRepository } from '../../infra/repos/postgres/repositories/userRepository'
import { Request, Response } from 'express'

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body
    const { team_id } = req.params

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All properties as required to create an User' })
    }

    try {
      const team = await teamRepository.findOneBy({ team_id })

      if (!team) return res.status(404).json('Team not found')

      const newUser = userRepository.create({ name, email, password, team })

      await userRepository.save(newUser)

      return res.status(201).json(newUser)
    } catch (error) {
      if (error.detail.includes('already exists')) {
        return res.status(409).json({ message: `Internal Server Error - Email already exists` })
      }
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async listUser(req: Request, res: Response) {
    try {
      const users = await userRepository.find({
        relations: {
          team: true
        }
      })

      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  login(req: Request, res: Response) {
    // Incomplete
    return res.send(res.locals)
  }
}
