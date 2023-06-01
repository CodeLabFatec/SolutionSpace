import { kanbanRepository } from '../repos/postgres/repositories/kanbanRepository';
import { Request, Response } from 'express';

class KanbanController {

    async getKanban(req: Request, res: Response) {
        try {
            const kanban = await kanbanRepository.find()

            return res.status(200).json(kanban);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }
}

const kanbanController = new KanbanController()
export default kanbanController