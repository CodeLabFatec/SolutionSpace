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

        const alreadyRated = await ratingRepository.find({
            where: {
                requestStep: requestStep as RequestStep,
                request: { request_id: requestId },
                user: { team: { team_id: user.team.team_id } }
            }
        });

        if (alreadyRated.length > 0)
            return res.status(400).json('There is already a rating for this request from the same team');

        const request = await requestRepository.findOne({
            where: { request_id: requestId },
            relations: { user: true }
        });

        if (!request) return res.status(404).json('Request not found');

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

        const forbiddenStatus = await statusConfigurationRepository.find({
            where: [
                { rating: '0', requestStep: RequestStep.ALINHAMENTO_ESTRATEGICO },
                { rating: '3', requestStep: RequestStep.ANALISE_RISCO }
            ]
        });

        if (forbiddenStatus.length !== 2)
            return res
                .status(404)
                .json(
                    `forbiddenStatus not found - Please insert a status for Forbbiden status of '${RequestStep.ALINHAMENTO_ESTRATEGICO}' and '${RequestStep.ANALISE_RISCO}'`
                );

        if (request.status === forbiddenStatus[0].status)
            return res.status(200).json('This request has already been archived');

        const alinhamentoForbidden = forbiddenStatus.find(
            i=> i.requestStep === RequestStep.ALINHAMENTO_ESTRATEGICO)

        const analiseForbidden = forbiddenStatus.find(
            i=> i.requestStep === RequestStep.ANALISE_RISCO)

        if(!alinhamentoForbidden || !analiseForbidden) {
            return res.status(404).json('No forbidden status found')
        }

        try {
            const statusConfig = await statusConfigurationRepository.findOne({
                where: {
                    rating,
                    requestStep: request.requestStep as RequestStep
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

                // Checar as condições para arquivar na etapa de alinhamento estratégico
                // (atualizar posteriormente com nova regra)
                if(createdRating.rating === '0' && createdRating.targetGroup && userGroupPermissions.mustRateAlinhamento){
                    await requestRepository.save({
                        ...request,
                        status: alinhamentoForbidden.status
                    });
    
                    request.status = alinhamentoForbidden.status
                    await notifyUserByRequest(request, createdRating)

                    return res.status(201).json(newRating);
                }
                
                if(userGroupPermissions.mustRateAlinhamento){
                    await requestRepository.save({
                        ...request,
                        status: statusConfig.status
                    });
    
                    request.status = statusConfig.status
                    await notifyUserByRequest(request, createdRating)
                }

            } else if(createdRating.requestStep === RequestStep.ANALISE_RISCO) {

                // Checar as condições para arquivar na etapa de análise de risco
                // (atualizar posteriormente com nova regra)
                if(userGroupPermissions.mustRateAnalise){
                    if(createdRating.rating === '3'){
                        await requestRepository.save({
                            ...request,
                            status: analiseForbidden.status
                        });
        
                        request.status = analiseForbidden.status
                        await notifyUserByRequest(request, createdRating)
    
                        return res.status(201).json(newRating);
                    } else {
                        await requestRepository.save({
                            ...request,
                            status: statusConfig.status,
                            requestStep: RequestStep.ALINHAMENTO_ESTRATEGICO
                        });
                        
                        request.status = statusConfig.status
                        await notifyUserByRequest(request, createdRating)

                        return res.status(201).json(newRating);
                    }
                }
            }

            return res.status(201).json(newRating);
        } catch (error) {

            return res.status(500).json({ message: `Internal Server Error - ${error}` });
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