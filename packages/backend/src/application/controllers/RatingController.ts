import { requestRepository } from '../../infra/repos/postgres/repositories/requestRepository'
import { Request, Response } from 'express'
import { userRepository } from '../../infra/repos/postgres/repositories/userRepository'
import { ratingRepository } from '../../infra/repos/postgres/repositories/ratingRepository'
import { RequestStep } from '../../infra/repos/postgres/entitites/Rating'
import { File } from '../../infra/repos/postgres/entitites/File'
import { fileRepository } from '../../infra/repos/postgres/repositories/fileRepository'
import { statusConfigurationRepository } from '../../infra/repos/postgres/repositories/statusConfigurationRepository'

export class RatingController {
  async create(req: Request, res: Response) {
    const { rating, user_id, title, description, requestStep, targetGroup, files } = req.body
    const { requestId } = req.params

    if (!rating || !user_id || !title || !requestStep || !requestId) {
      return res.status(400).json({ message: 'Missing required informations to create a rating' })
    }

    const ratingFiles: File[] = files
    const createdFiles: File[] = []

    const user = await userRepository.findOne({ where: { user_id }, relations: { team: true } })

    if (!user) return res.status(404).json('User not found')

    const alreadyRated = await ratingRepository.find({
      where: {
        requestStep: requestStep as RequestStep,
        request: { request_id: requestId },
        user: { team: { team_id: user.team.team_id } }
      }
    })

    if (alreadyRated.length > 0)
      return res.status(400).json('There is already a rating for this request from the same team')

    const request = await requestRepository.findOneBy({ request_id: requestId })

    if (!request) return res.status(404).json('Request not found')

    const forbiddenStatus = await statusConfigurationRepository.find({
      where: [
        { rating: '0', requestStep: RequestStep.ALINHAMENTO_ESTRATEGICO },
        { rating: '3', requestStep: RequestStep.ANALISE_RISCO }
      ]
    })

    if (forbiddenStatus.length !== 2)
      return res
        .status(404)
        .json(
          `forbiddenStatus not found - Please insert a status for Forbbiden status of '${RequestStep.ALINHAMENTO_ESTRATEGICO}' and '${RequestStep.ANALISE_RISCO}'`
        )

    if (request.status === forbiddenStatus[0].status)
      return res.status(200).json('This request has already been archived')

    try {
      const statusConfig = await statusConfigurationRepository.findOne({
        where: {
          rating,
          requestStep: request.requestStep as RequestStep
        }
      })

      if (!statusConfig)
        return res
          .status(404)
          .json(
            `Status not found - Please Insert a new status for request step '${request.requestStep}' and rating '${rating}'`
          )

      const ClosedStatus = await statusConfigurationRepository.findOne({
        where: {
          rating: '3',
          requestStep: RequestStep.ALINHAMENTO_ESTRATEGICO
        }
      })

      if (!ClosedStatus)
        return res
          .status(404)
          .json(
            `Status not found - Please Insert a new status for request step '${RequestStep.ALINHAMENTO_ESTRATEGICO}' and rating '3'`
          )

      if (ratingFiles.length > 0) {
        ratingFiles.forEach(async (file) => {
          const newFile = fileRepository.create({
            file_name: file.file_name,
            base64: file.base64,
            ext: file.ext
          })

          await fileRepository.save(newFile)

          if (newFile) {
            createdFiles.push(newFile)
          }
        })
      }

      const newRating = ratingRepository.create({
        rating,
        user,
        request,
        title,
        description,
        requestStep: request.requestStep as RequestStep,
        targetGroup
      })

      const createdRating = await ratingRepository.save(newRating)

      if (
        createdRating.rating !== '0' &&
        createdRating.requestStep === RequestStep.ALINHAMENTO_ESTRATEGICO &&
        createdRating.targetGroup
      ) {
        await requestRepository.save({
          ...request,
          status: ClosedStatus.status
        })
      } else {
        await requestRepository.save({
          ...request,
          status: statusConfig.status
        })
      }

      if (createdRating.requestStep === RequestStep.ANALISE_RISCO) {
        await requestRepository.save({
          ...request,
          status: statusConfig.status,
          requestStep: RequestStep.ALINHAMENTO_ESTRATEGICO
        })
      }

      if (createdFiles.length > 0) {
        const createdRatingWithFiles = await ratingRepository.save({
          ...createdRating,
          files: createdFiles
        })

        return res.status(201).json(createdRatingWithFiles)
      }

      const returnedRating = await ratingRepository.findOneBy({ rating_id: createdRating.rating_id })

      return res.status(201).json(returnedRating)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async listRatings(req: Request, res: Response) {
    try {
      const ratings = await ratingRepository.find({
        relations: { user: { team: true }, request: { user: true }, files: true }
      })

      return res.status(200).json(ratings)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async getRatingById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const rating = await ratingRepository.findOne({
        where: { rating_id: id },
        relations: { user: { team: true }, request: { user: true }, files: true }
      })

      if (!rating) return res.status(404).json('Rating not found')

      return res.status(200).json(rating)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }

  async listRatingsByRequestId(req: Request, res: Response) {
    const { request_id } = req.params

    try {
      const ratings = await ratingRepository.find({
        where: { request: { request_id } },
        relations: { user: { team: true }, request: { user: true }, files: true }
      })

      if (!ratings) return res.status(404).json('Ratings not found for this request id')

      return res.status(200).json(ratings)
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error - ${error}` })
    }
  }
}
