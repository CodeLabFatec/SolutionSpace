import { teamRepository } from '../../infra/repos/postgres/repositories/teamRepository'
import { Request, Response } from 'express'

export class TeamController {
  async create(req: Request, res: Response) {
    const { teamName } = req.body

    if (!teamName) {
      return res.status(400).json({ message: 'Team name is required to create a team' })
    }

    try {
      const newGroup = teamRepository.create({ team_name: teamName })

      await teamRepository.save(newGroup)

      return res.status(201).json(newGroup)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async listTeams(req: Request, res: Response) {
    try {
      const users = await teamRepository.find()

      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }
}
