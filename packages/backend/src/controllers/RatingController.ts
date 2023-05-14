import { requestRepository } from '../repos/postgres/repositories/requestRepository';
import { Request, Response } from 'express';
import { userRepository } from '../repos/postgres/repositories/userRepository';
import { ratingRepository } from '../repos/postgres/repositories/ratingRepository';
import { RequestStep } from '../repos/postgres/entitites/Rating';
import { File } from '../repos/postgres/entitites/File';
import { fileRepository } from '../repos/postgres/repositories/fileRepository';
import { statusConfigurationRepository } from '../repos/postgres/repositories/statusConfigurationRepository';
import { checkGroupPermission } from '../utils/checkGroupPermissions';
import { notifyUserByRequest } from '../utils/notifyUser';
import { groupRepository } from '../repos/postgres/repositories/groupRepository';
import { RequestStepStatus } from '../repos/postgres/entitites/StatusConfiguration';

class RatingController {
    async create(req: Request, res: Response) {
        const { rating, user_id, title, description, requestStep, targetGroup, files } = req.body;
        const { requestId } = req.params;

        if (!rating || !user_id || !title || !requestStep || !requestId) {
            return res.status(400).json({ message: 'Missing required informations to create a rating' });
        }

        const ratingFiles: File[] = files;
        const createdFiles: File[] = [];

        const user = await userRepository.findOne({ where: { user_id }, relations: { team: true, group: true } });

        if (!user) return res.status(404).json('User not found');

        const userGroupPermissions = await checkGroupPermission(user.group.group_id);

        
        let request = await requestRepository.findOne({
            where: { request_id: requestId },
            relations: { user: true }
        });
        
        if (!request) return res.status(404).json('Request not found');

        if (request.arquived) return res.status(200).json('This request has already been archived');

        const alreadyRated = await ratingRepository.find({
            where: {
                requestStep: requestStep as RequestStep,
                request: { request_id: requestId },
                user: { group: { group_id: user.group.group_id } }
            }
        });

        if (alreadyRated.length > 0)
            return res.status(400).json('There is already a rating for this request from the same group');

        if (
            request.requestStep === RequestStep.ANALISE_RISCO &&
            userGroupPermissions.canRateAnalise === false
        )
            return res.status(401).json({ message: "Não autorizado - O seu grupo não tem permissão para avaliar este chamado" })

        if (
            request.requestStep === RequestStep.ALINHAMENTO_ESTRATEGICO &&
            userGroupPermissions.canRateAlinhamento === false
        )
            return res.status(401).json({ message: "Não autorizado - O seu grupo não tem permissão para avaliar este chamado" })

        if(
            request.requestStep === RequestStep.ALINHAMENTO_ESTRATEGICO &&
            userGroupPermissions.mustRateAlinhamento &&
            targetGroup
        ){
            const groupExists = await groupRepository.findBy({ group_id: targetGroup })            

            if(!groupExists){
                return res.status(401).json('O grupo informado não existe.')
            }

        }else if(
            request.requestStep === RequestStep.ALINHAMENTO_ESTRATEGICO &&
            userGroupPermissions.mustRateAlinhamento &&
            !targetGroup
        ){
            return res.status(401).json('Você deve enviar um grupo alvo.')
        }

        try {
            const statusConfig = await statusConfigurationRepository.findOne({
                where: {
                    rating,
                    requestStep: request.requestStep === RequestStep.ALINHAMENTO_ESTRATEGICO ?  
                    RequestStepStatus.ALINHAMENTO_ESTRATEGICO : RequestStepStatus.ANALISE_RISCO
                }
            });

            if (!statusConfig)
                return res
                    .status(404)
                    .json(
                        `Status not found - Please Insert a new status for request step '${request.requestStep}' and rating '${rating}'`
                    );

            if (ratingFiles.length > 0) {
                ratingFiles.forEach(async (file) => {
                    const newFile = fileRepository.create({
                        file_name: file.file_name,
                        base64: file.base64,
                        ext: file.ext
                    });

                    await fileRepository.save(newFile);

                    if (newFile) {
                        createdFiles.push(newFile);
                    }
                });
            }

            let newRating = ratingRepository.create({
                rating,
                user,
                request,
                title,
                description,
                requestStep: request.requestStep as RequestStep,
                targetGroup
            });

            const createdRating = await ratingRepository.save(newRating);

            if (createdFiles.length > 0) {
                newRating = await ratingRepository.save({
                    ...createdRating,
                    files: createdFiles
                });
            }

            if(createdRating.requestStep === RequestStep.ALINHAMENTO_ESTRATEGICO){

                if(userGroupPermissions.mustRateAlinhamento){

                    if(statusConfig.archiveRequests){
                        request = await requestRepository.save({
                            ...request,
                            arquived: true,
                            status: statusConfig
                        })
                    }else{
                        request = await requestRepository.save({
                            ...request,
                            approved: true,
                            status: statusConfig
                        })
                    }

                    await notifyUserByRequest(request, createdRating)

                    return res.status(201).json(newRating);
                }

            } else if(createdRating.requestStep === RequestStep.ANALISE_RISCO) {

                if(userGroupPermissions.mustRateAnalise){

                    if(statusConfig.archiveRequests){
                        request = await requestRepository.save({
                            ...request,
                            arquived: true,
                            status: statusConfig
                        })  
                    }else{
                        request = await requestRepository.save({
                            ...request,
                            status: statusConfig,
                            requestStep: RequestStep.ALINHAMENTO_ESTRATEGICO
                        })
                    }

                    await notifyUserByRequest(request, createdRating)

                    return res.status(201).json(newRating);
                }

            }

            return res.status(201).json(newRating);
        } catch (error) {

            return res.status(500).json(`Internal Server Error - ${error}`);
        }
    }

    async listRatings(req: Request, res: Response) {
        try {
            const ratings = await ratingRepository.find({
                relations: { user: { team: true }, request: { user: true }, files: true }
            });

            return res.status(200).json(ratings);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async getRatingById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const rating = await ratingRepository.findOne({
                where: { rating_id: id },
                relations: { user: { team: true }, request: { user: true }, files: true }
            });

            if (!rating) return res.status(404).json('Rating not found');

            return res.status(200).json(rating);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async listRatingsByRequestId(req: Request, res: Response) {
        const { request_id } = req.params;

        try {
            const ratings = await ratingRepository.find({
                where: { request: { request_id } },
                relations: { user: { team: true }, request: { user: true }, files: true },
                order: { created_at: 'ASC' }
            });

            if (!ratings) return res.status(404).json('Ratings not found for this request id');

            return res.status(200).json(ratings);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }
}

const ratingController = new RatingController()
export default ratingController