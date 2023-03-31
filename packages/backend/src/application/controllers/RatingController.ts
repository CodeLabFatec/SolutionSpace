import { requestRepository } from '../../infra/repos/postgres/repositories/requestRepository'
import { Request, Response } from 'express'
import { userRepository } from '../../infra/repos/postgres/repositories/userRepository'
import { ratingRepository } from '../../infra/repos/postgres/repositories/ratingRepository'
import { RequestStep } from '../../infra/repos/postgres/entitites/Rating'
import { File } from '../../infra/repos/postgres/entitites/File'
import { fileRepository } from '../../infra/repos/postgres/repositories/fileRepository'

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
        request: { request_id: requestId },
        user: { team: { team_id: user.team.team_id } }
      }
    })

    if (alreadyRated.length) {
      return res.status(400).json('There is already a rating for this request from the same team')
    }

    const request = await requestRepository.findOneBy({ request_id: requestId })

    if (!request) return res.status(404).json('Request not found')

    try {
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

      if (createdFiles.length > 0) {
        const requestInsertFiles = {
          ...createdRating,
          files: createdFiles
        }

        const createdRatingWithFiles = await ratingRepository.save(requestInsertFiles)

        return res.status(201).json(createdRatingWithFiles)
      }

      return res.status(201).json(newRating)
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
