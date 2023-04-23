import { teamRepository } from '../repos/postgres/repositories/teamRepository'
import { groupRepository } from '../repos/postgres/repositories/groupRepository'
import { Request, Response } from 'express'

export class GroupController {
  async create(req: Request, res: Response) {
    const { group_name, description, canRequestFeatures, canRequestHotfix, canRateAnalise, mustRateAnalise,
      canRateAnalinhamento, mustRateAnalinhamento, team_id } = req.body

    if (!group_name || !description || !team_id) {
      return res.status(400).json({ message: 'Group name, description and team id are required to create a group' })
    }

    try {

      const team = await teamRepository.findOneBy({ team_id })

      if (!team) return res.status(404).json('Team not found')

      const group: any = {}
      group.team = team
      group.group_name = group_name
      group.description = description
      if (canRequestFeatures) {
        group.canRequestFeatures = canRequestFeatures
      }
      if (canRequestHotfix) {
        group.canRequestHotfix = canRequestHotfix
      }
      if (canRateAnalinhamento) {
        group.canRateAnalinhamento = canRateAnalinhamento
      }
      if (canRateAnalise) {
        group.canRateAnalise = canRateAnalise
      }
      if (mustRateAnalinhamento) {
        group.mustRateAnalinhamento = mustRateAnalinhamento
      }
      if (mustRateAnalise) {
        group.mustRateAnalise = mustRateAnalise
      }

      const newGroup = groupRepository.create(group)

      await groupRepository.save(newGroup)

      return res.status(201).json(newGroup)
    } catch (error) {
      if (error.message.includes("duplicate key value violates unique constraint")) {
        return res.status(500).json({ message: "Grupo já cadastrado" })
      }
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async edit(req: Request, res: Response) {
    const { group_id, description, group_name, canRequestFeatures, canRequestHotfix, canRateAnalise, mustRateAnalise,
      canRateAnalinhamento, mustRateAnalinhamento, team_id } = req.body

    if (!group_id || !group_name || !description) {
      return res.status(400).json({ message: 'All properties are required to edit an Group' })
    }

    try {
      const team = await teamRepository.findOneBy({ team_id })

      if (!team) return res.status(404).json('Team not found')

      const group = await groupRepository.findOne({ where: { group_id } })

      if (!group) return res.status(404).json('Group not found')

      group.group_name = group_name
      group.team = team
      group.description = description
      group.canRequestFeatures = canRequestFeatures
      group.canRequestHotfix = canRequestHotfix
      group.canRateAnalinhamento = canRateAnalinhamento
      group.canRateAnalise = canRateAnalise
      group.mustRateAnalinhamento = mustRateAnalinhamento
      group.mustRateAnalise = mustRateAnalise

      await groupRepository.save(group)

      return res.status(200).json({ group })

    } catch (error) {
      if (error.message.includes("duplicate key value violates unique constraint")) {
        return res.status(500).json({ message: "Grupo já cadastrado" })
      }
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const group = await groupRepository.findOne({ where: { group_id: id } })

      if (!group) return res.status(404).json('Group not found')

      await groupRepository.delete({ group_id: id })

      return res.status(200).json(group)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async listGroups(req: Request, res: Response) {
    try {
      const groups = await groupRepository.find({ relations: { team: true } })

      return res.status(200).json(groups)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async getGroupById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const group = await groupRepository.findOne({ where: { group_id: id } })

      if (!group) return res.status(404).json('Group not found')

      return res.status(200).json(group)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async getGroupsByTeam(req: Request, res: Response) {
    const { team_id } = req.params

    try {
      const groups = await groupRepository.find({ where: { team: { team_id } } })

      if (!groups) return res.status(404).json('Groups not found for this team')

      return res.status(200).json(groups)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async checkGroupPermission(req: Request, res: Response) {
    const { group_id } = req.params;

    try {
      const group = await groupRepository.findOneBy({ group_id });

      if (!group) return res.status(404).json('Group not found')

      return res.status(200).json({
        canRateAnalise: group.canRateAnalise,
        mustRateAnalise: group.mustRateAnalise,
        canRateAlinhamento: group.canRateAnalinhamento,
        mustRateAlinhamento: group.mustRateAnalinhamento
      })
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` });
    }
  }
}