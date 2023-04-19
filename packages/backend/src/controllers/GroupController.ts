import { teamRepository } from '../repos/postgres/repositories/teamRepository'
import { groupRepository } from '../repos/postgres/repositories/groupRepository'
import { Request, Response } from 'express'

export class GroupController {
  async create(req: Request, res: Response) {
    const { group_name, canRequestFeatures, canRequestHotfix, canRatingAnalise, mustRateAnalise,
      canRatingAnalinhamento, mustRateAnalinhamento, team_id } = req.body

    if (!group_name || !team_id) {
      return res.status(400).json({ message: 'Group name and team id are required to create a group' })
    }

    try {

      const team = await teamRepository.findOneBy({ team_id })

      if (!team) return res.status(404).json('Team not found')

      const group: any = {}
      group.team = team
      group.group_name = group_name
      if (canRequestFeatures) {
        group.canRequestFeatures = canRequestFeatures
      }
      if (canRequestHotfix) {
        group.canRequestHotfix = canRequestHotfix
      }
      if (canRatingAnalinhamento) {
        group.canRatingAnalinhamento = canRatingAnalinhamento
      }
      if (canRatingAnalise) {
        group.canRatingAnalise = canRatingAnalise
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
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async edit(req: Request, res: Response) {
    const { group_id, group_name, canRequestFeatures, canRequestHotfix, canRatingAnalise, mustRateAnalise,
      canRatingAnalinhamento, mustRateAnalinhamento, team_id } = req.body

    if (!group_id || !group_name) {
      return res.status(400).json({ message: 'All properties are required to edit an Group' })
    }

    try {
      const team = await teamRepository.findOneBy({ team_id })

      if (!team) return res.status(404).json('Team not found')

      const group = await groupRepository.findOne({ where: { group_id } })

      if (!group) return res.status(404).json('Group not found')

      group.group_name = group_name
      group.team = team
      group.canRequestFeatures = canRequestFeatures
      group.canRequestHotfix = canRequestHotfix
      group.canRatingAnalinhamento = canRatingAnalinhamento
      group.canRatingAnalise = canRatingAnalise
      group.mustRateAnalinhamento = mustRateAnalinhamento
      group.mustRateAnalise = mustRateAnalise

      await groupRepository.save(group)

      return res.status(200).json({ group })

    } catch (error) {
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
      const groups = await groupRepository.find()

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
}
