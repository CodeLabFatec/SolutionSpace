import { teamRepository } from '../repos/postgres/repositories/teamRepository';
import { Request, Response } from 'express';

class TeamController {
    async create(req: Request, res: Response) {
        const { team_name, description, permissionCreateUsers, permissionCreateTeams,
            permissionCreateGroups, permissionEditRequests, permissionUnarchiveRequests } = req.body;

        if (!team_name || !description) {
            return res.status(400).json({ message: 'All properties are required to create a team' });
        }

        try {
            const newTeam = teamRepository.create(
                {
                    team_name,
                    description,
                    permissionCreateGroups,
                    permissionCreateTeams,
                    permissionCreateUsers,
                    permissionEditRequests,
                    permissionUnarchiveRequests
                });

            await teamRepository.save(newTeam);

            return res.status(201).json(newTeam);
        } catch (error) {
            if (error.message.includes("duplicate key value violates unique constraint")) {
                return res.status(500).json({ message: "Equipe já cadastrada." })
            }
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
        const { team_name, description, permissionCreateUsers, permissionCreateTeams,
            permissionCreateGroups, permissionEditRequests, permissionUnarchiveRequests } = req.body;
        const { team_id } = req.params;

        if (!team_name || !description) {
            return res.status(400).json({ message: 'All properties are required to edit an Team' });
        }

        try {
            const team = await teamRepository.findOne({
                where: { team_id }
            });

            if (!team) return res.status(404).json('Team not found');

            team.team_name = team_name;
            team.description = description;
            team.permissionCreateGroups = permissionCreateGroups;
            team.permissionCreateTeams = permissionCreateTeams;
            team.permissionCreateUsers = permissionCreateUsers;
            team.permissionEditRequests = permissionEditRequests;
            team.permissionUnarchiveRequests = permissionUnarchiveRequests;

            await teamRepository.save(team);

            return res.status(201).json(team);
        }
        catch (error) {
            if (error.message.includes("duplicate key value violates unique constraint")) {
                return res.status(500).json({ message: "Equipe já cadastrada." })
            }
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

const teamController = new TeamController()
export default teamController