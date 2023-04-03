import { teamRepository } from '../../infra/repos/postgres/repositories/teamRepository'
import { Request, Response } from 'express'

export class TeamController {
  async create(req: Request, res: Response) {
    const { teamName } = req.body

    if (!teamName) {
      return res.status(400).json({ message: 'Team name is required to create a team' })
    }

    try {
      const newTeam = teamRepository.create({ team_name: teamName })

      await teamRepository.save(newTeam)

      return res.status(201).json(newTeam)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async listTeams(req: Request, res: Response) {
    try {
      const teams = await teamRepository.find({ relations: { users: true } })

      return res.status(200).json(teams)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const team = await teamRepository.findOne({ where: { team_id: id }, relations: { users: true } })

      if (!team) return res.status(404).json('Team not found')

      return res.status(200).json(team)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }
}
