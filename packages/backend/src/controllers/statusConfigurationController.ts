import { StatusConfiguration } from '../repos/postgres/entitites/StatusConfiguration';
import { RequestStep } from '../repos/postgres/entitites/Rating';
import { statusConfigurationRepository } from '../repos/postgres/repositories/statusConfigurationRepository';
import { Request, Response } from 'express';

class StatusConfigurationController {

    async create(req: Request, res: Response) {
        const { rating, status, requestStep } = req.body;

        if (!rating || !status || !requestStep) {
            return res.status(400).json({ message: 'Propertiesrequired to create a status configuration' });
        }

        try {
            const alreadyCreated = await statusConfigurationRepository.findOne({
                where: {
                    rating,
                    requestStep: requestStep === 'ALINHAMENTO' ? RequestStep.ALINHAMENTO_ESTRATEGICO : RequestStep.ANALISE_RISCO
                }
            });

            if (alreadyCreated) return res.status(400).json('Status already exist for this request step');

            const newStatus = statusConfigurationRepository.create({
                rating,
                status,
                requestStep: requestStep === 'ALINHAMENTO' ? RequestStep.ALINHAMENTO_ESTRATEGICO : RequestStep.ANALISE_RISCO
            });

            const createdStatus = await statusConfigurationRepository.save(newStatus);

            return res.status(201).json(createdStatus);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async listStatus(req: Request, res: Response) {
        try {
            const status = await statusConfigurationRepository.find({ order: { rating: 'ASC' } });

            return res.status(200).json(status);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async getStatusById(req: Request, res: Response) {
        const { status_id } = req.params;

        try {
            const status = await statusConfigurationRepository.findOneBy({ status_id });

            if (!status) return res.status(404).json('Status not found');

            return res.status(200).json(status);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async getStatusRequestStep(req: Request, res: Response) {
        const { requestStep } = req.params;
        const stepToFind = requestStep === "AnaliseRisco" ? RequestStep.ANALISE_RISCO : RequestStep.ALINHAMENTO_ESTRATEGICO

        try {
            const statuses = await statusConfigurationRepository.find({ where: { requestStep: stepToFind }, order: { rating: 'ASC' } });

            if (!statuses) return res.status(404).json('Statuses not found');

            return res.status(200).json(statuses);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async updateStatus(req: Request, res: Response) {
        const statuses: any[] = req.body;

        if (statuses.length !== 4) {
            return res.status(400).json({ message: '4 created statuses is necessary to perform an update in statuses' });
        }

        try{

            statuses.forEach(async (statusConfiguration) => {
                const foundStatusConfiguration = await statusConfigurationRepository.findOne({
                    where: { status_id: statusConfiguration.status_id },
                });
    
                if (!foundStatusConfiguration) return res.status(404).json('Status configuration not found');
    
                foundStatusConfiguration.archiveRequests = statusConfiguration.archiveRequests;
                foundStatusConfiguration.color = statusConfiguration.color;
                foundStatusConfiguration.rating = statusConfiguration.rating;
                foundStatusConfiguration.requestStep = statusConfiguration.requestStep;
                foundStatusConfiguration.status = statusConfiguration.status;
    
                await statusConfigurationRepository.save(foundStatusConfiguration);
            })
            return res.status(200).json(statuses)
        } catch (error) {
            return res.status(500).json(`Internal Server Error - ${error}`);
        }
    }
}

const statusConfigurationController = new StatusConfigurationController()
export default statusConfigurationController