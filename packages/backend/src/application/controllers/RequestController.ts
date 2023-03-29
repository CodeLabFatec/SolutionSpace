import { requestRepository } from '../../infra/repos/postgres/repositories/requestRepository'
import { Request, Response } from 'express'
import { userRepository } from '../../infra/repos/postgres/repositories/userRepository'
import { RequestType } from '../../infra/repos/postgres/entitites/Request'
import { RequestStep } from '../../infra/repos/postgres/entitites/Rating'

export class RequestController {
  async create(req: Request, res: Response) {
    const { title, description, requestType } = req.body
    const { userId } = req.params

    if (!title || !requestType || !userId) {
      return res.status(400).json({ message: 'Missing required informations to create a request' })
    }

    const user = await userRepository.findOneBy({ user_id: userId })

    if (!user) return res.status(404).json('User not found')

    try {
      const newRequest = requestRepository.create({
        title,
        description,
        requestType: requestType === 'FEATURE' ? RequestType.FEATURE : RequestType.HOTFIX,
        requestStep: requestType === 'FEATURE' ? RequestStep.ANALISE_RISCO : RequestStep.ALINHAMENTO_ESTRATEGICO,
        user
      })

      await requestRepository.save(newRequest)

      return res.status(201).json(newRequest)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async listRequests(req: Request, res: Response) {
    try {
      const requests = await requestRepository.find({ relations: { user: { team: true }, files: true } })

      return res.status(200).json(requests)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async listRequestsByUser(req: Request, res: Response) {
    const { user_id } = req.params

    try {
      const requests = await requestRepository.find({
        where: { user: { user_id } },
        relations: { user: { team: true }, files: true }
      })

      return res.status(200).json(requests)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async getRequestById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const request = await requestRepository.findOne({
        where: { request_id: id },
        relations: { user: { team: true }, files: true }
      })

      if (!request) return res.status(404).json('Request not found')

      return res.status(200).json(request)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }
}
