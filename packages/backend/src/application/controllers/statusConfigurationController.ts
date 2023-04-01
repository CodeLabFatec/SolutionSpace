import { RequestStep } from '../../infra/repos/postgres/entitites/Rating'
import { statusConfigurationRepository } from '../../infra/repos/postgres/repositories/statusConfigurationRepository'
import { Request, Response } from 'express'

export class StatusConfigurationController {
  async create(req: Request, res: Response) {
    const { rating, status, requestStep } = req.body

    if (!rating || !status || !requestStep) {
      return res.status(400).json({ message: 'Propertiesrequired to create a status configuration' })
    }

    try {
      const alreadyCreated = await statusConfigurationRepository.findOne({
        where: {
          rating,
          requestStep: requestStep === 'ALINHAMENTO' ? RequestStep.ALINHAMENTO_ESTRATEGICO : RequestStep.ANALISE_RISCO
        }
      })

      if (alreadyCreated) return res.status(400).json('Status already exist for this request step')

      const newStatus = statusConfigurationRepository.create({
        rating,
        status,
        requestStep: requestStep === 'ALINHAMENTO' ? RequestStep.ALINHAMENTO_ESTRATEGICO : RequestStep.ANALISE_RISCO
      })

      const createdStatus = await statusConfigurationRepository.save(newStatus)

      return res.status(201).json(createdStatus)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async listStatus(req: Request, res: Response) {
    try {
      const status = await statusConfigurationRepository.find()

      return res.status(200).json(status)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async getStatusById(req: Request, res: Response) {
    const { status_id } = req.params

    try {
      const status = await statusConfigurationRepository.findOneBy({ status_id })

      if (!status) return res.status(404).json('Status not found')

      return res.status(200).json(status)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }
}
