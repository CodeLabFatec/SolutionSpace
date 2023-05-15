import { requestRepository } from '../repos/postgres/repositories/requestRepository';
import { Request, Response } from 'express';
import { userRepository } from '../repos/postgres/repositories/userRepository';
import { RequestType } from '../repos/postgres/entitites/Request';
import { RequestStep } from '../repos/postgres/entitites/Rating';
import { ratingRepository } from '../repos/postgres/repositories/ratingRepository';
import { In } from 'typeorm';
import { fileRepository } from '../repos/postgres/repositories/fileRepository';
import { File } from '../repos/postgres/entitites/File';

class RequestController {
    async create(req: Request, res: Response) {
        const { title, description, requestType, files } = req.body;
        const { userId } = req.params;

        if (!title || !requestType || !userId) {
            return res.status(400).json({ message: 'Missing required informations to create a request' });
        }

        const requestFiles: File[] = files;
        const createdFiles: File[] = [];

        const user = await userRepository.findOneBy({ user_id: userId });

        if (!user) return res.status(404).json('User not found');

        try {
            if (requestFiles.length > 0) {
                requestFiles.forEach(async (file) => {
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

            const newRequest = requestRepository.create({
                title,
                description,
                requestType: requestType === 'FEATURE' ? RequestType.FEATURE : RequestType.HOTFIX,
                requestStep: requestType === 'FEATURE' ? RequestStep.ANALISE_RISCO : RequestStep.ALINHAMENTO_ESTRATEGICO,
                user
            });

            const createdRequest = await requestRepository.save(newRequest);

            if (createdFiles.length > 0) {
                const requestInsertFiles = {
                    ...createdRequest,
                    files: createdFiles
                };

                const createdRequestWithFiles = await requestRepository.save(requestInsertFiles);

                return res.status(201).json(createdRequestWithFiles);
            }

            return res.status(201).json(createdRequest);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async listRequests(req: Request, res: Response) {
        try {
            const requests = await requestRepository.find(
                { relations: { user: { team: true }, files: true, status: true, ratings: { user: true } } });

            return res.status(200).json(requests);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async listRequestsByUser(req: Request, res: Response) {
        const { user_id } = req.params;

        try {
            const requests = await requestRepository.find({
                where: { user: { user_id } },
                relations: { user: { team: true }, files: true, status: true }
            });

            return res.status(200).json(requests);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async listRequestsByTeam(req: Request, res: Response) {
        const { user_id } = req.params;

        const user = await userRepository.findOne({ where: { user_id }, relations: { team: true } });

        if (!user) return res.status(404).json('User not found');

        try {
            if (user.team.team_name === 'Solicitante') {
                const requests = await requestRepository.find({
                    where: { user: { user_id } },
                    relations: { user: { team: true }, files: true, status: true }
                });

                return res.status(200).json(requests);
            }

            let teamRatedIds: string[] = [];

            const teamRated = await ratingRepository.find({
                where: { user: { team: { team_name: user.team.team_name } } },
                relations: { request: true }
            });

            if (teamRated) {
                teamRatedIds = teamRated.map((rating) => rating.request.request_id);
            }

            if (teamRatedIds.length > 0) {
                const teamRequests = await requestRepository.find({
                    where: [{ user: { team: { team_name: user.team.team_name } } }],
                    relations: { user: { team: true }, files: true, status: true }
                });

                const teamRatedRequests = await requestRepository.find({
                    where: { request_id: In(teamRatedIds) },
                    relations: { user: { team: true }, files: true, status: true }
                });

                const filteredRequests = teamRequests.filter(
                    (req) => !teamRatedRequests.filter((req2) => req.request_id === req2.request_id).length
                );

                return res.status(200).json(filteredRequests);
            }

            const teamRequests = await requestRepository.find({
                where: [{ user: { team: { team_name: user.team.team_name } } }],
                relations: { user: { team: true }, files: true, status: true }
            });

            return res.status(200).json(teamRequests);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async getRequestById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const request = await requestRepository.findOne({
                where: { request_id: id },
                relations: { user: { team: true }, files: true, status: true }
            });

            if (!request) return res.status(404).json('Request not found');

            return res.status(200).json(request);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async listArchivedRequests(req: Request, res: Response) {
        try {
            const requests = await requestRepository.find({
                where: { arquived: true },
                relations: { user: { team: true, group: true }, files: true, status: true }
            });

            return res.status(200).json(requests);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async unarchiveRequest(req: Request, res: Response) {
        const { request_id } = req.params;

        try {
            const request = await requestRepository.findOne({
                where: { request_id: request_id }
            });

            if (!request) return res.status(404).json('Request not found');

            if (!request.arquived) return res.status(404).json('Request is not arquived');

            if(request.requestType === RequestType.HOTFIX) {
                request.status = null
                request.arquived = false
                requestRepository.save(request)

                return res.status(200).json({ request })
            }else if(request.requestType === RequestType.FEATURE) {

                request.status = null
                request.arquived = false

                if(request.requestStep === RequestStep.ALINHAMENTO_ESTRATEGICO) {
                    request.requestStep = RequestStep.ANALISE_RISCO
                }
                
                requestRepository.save(request)

                return res.status(200).json({ request })
            }

            return res.status(404).json('Um erro inesperado ocorreu.')
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }
    
}

const requestController = new RequestController()
export default requestController