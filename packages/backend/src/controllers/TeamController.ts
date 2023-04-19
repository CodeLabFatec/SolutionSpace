import { teamRepository } from '../repos/postgres/repositories/teamRepository';
import { Request, Response } from 'express';

export class TeamController {
    async create(req: Request, res: Response) {
        const { teamName } = req.body;

        if (!teamName) {
            return res.status(400).json({ message: 'Team name is required to create a team' });
        }

        try {
            const newTeam = teamRepository.create({ team_name: teamName });

            await teamRepository.save(newTeam);

            return res.status(201).json(newTeam);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async listTeams(req: Request, res: Response) {
        try {
            const teams = await teamRepository.find({ relations: { users: true } });

            return res.status(200).json(teams);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async getTeamById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const team = await teamRepository.findOne({ where: { team_id: id }, relations: { users: true } });

            if (!team) return res.status(404).json('Team not found');

            return res.status(200).json(team);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async editTeam(req: Request, res: Response) {
        const { name, description } = req.body;
        const { team_id } = req.params;

        if (!name) {
            return res.status(400).json({ message: 'All properties as required to edit an Team' });
        }

        try {
            const team = await teamRepository.findOne({
                where: { team_id },
                relations: { users: true }
            });

            if (!team) return res.status(404).json('Team not found');

            team.team_name = name;

            if (description)
                team.description = description;

            await teamRepository.save(team);

            return res.status(201).json(team);
        }
        catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async deleteTeam(req: Request, res: Response) {
        const { team_id } = req.params;

        try {
            const team = await teamRepository.findOne({
                where: { team_id }
            });

            if (!team) return res.status(404).json('Team not found');

            await teamRepository.remove(team);

            return res.status(201).json({
                message: "Team succesfully deleted.",
                team
            });
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }
}