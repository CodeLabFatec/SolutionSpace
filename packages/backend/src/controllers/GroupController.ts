import { groupRepository } from '../repositories/groupRepository'
import { Request, Response } from 'express'

export class GroupController {
  async create(req: Request, res: Response) {
    const { groupName } = req.body

    if (!groupName) {
      return res.status(400).json({ message: 'Group name is required to create a group' })
    }

    try {
      const newGroup = groupRepository.create({ group_name: groupName })

      await groupRepository.save(newGroup)

      return res.status(201).json(newGroup)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async listGroups(req: Request, res: Response) {
    try {
      const users = await groupRepository.find()

      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }
}
