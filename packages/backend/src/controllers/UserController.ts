import { verifyEmailExists } from '../utils/verifyEmailExists';
import { teamRepository } from '../repos/postgres/repositories/teamRepository';
import { userRepository } from '../repos/postgres/repositories/userRepository';
import { Request, Response } from 'express';
import { dataDecript } from '../utils/encryptor';
import { groupRepository } from '../repos/postgres/repositories/groupRepository';

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password, gender, team_id, group_id } = req.body;

        if (!name || !email || !password || !gender || !team_id || !group_id) {
            return res.status(400).json({ message: 'All properties are required to create an User' });
        }

        try {
            const team = await teamRepository.findOneBy({ team_id });

            if (!team) return res.status(404).json('Team not found');

            const group = await groupRepository.findOneBy({ group_id });

            if (!group) return res.status(404).json('Group not found');

            const newUser = userRepository.create({ name, email, password, gender, group, team });

            await userRepository.save(newUser);

            return res.status(201).json(newUser);
        } catch (error) {
            if (error.message.includes("duplicate key value violates unique constraint")) {
                return res.status(500).json({ message: "Email já cadastrado" })
            }
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async listUser(req: Request, res: Response) {
        try {
            const users = await userRepository.find({
                relations: { team: true, group: true }
            });

            users.forEach(user => {
                user.password = dataDecript(user.password)
            })

            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await userRepository.findOne({
                where: { user_id: id },
                relations: { team: true, group: true }
            });

            if (!user) return res.status(404).json('User not found');

            return res.status(200).json(
                {
                    user,
                    passwordDecrypted: dataDecript(user.password)
                });
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async editUser(req: Request, res: Response) {
        const { name, email, password, gender, team_id, group_id } = req.body;
        const { user_id } = req.params;

        if (!name || !email || !password || !gender || !team_id || !group_id) {
            return res.status(400).json({ message: 'All properties are required to edit an User' });
        }

        try {
            const user = await userRepository.findOne({
                where: { user_id },
                relations: { team: true, group: true }
            });

            if (!user) return res.status(404).json('User not found');

            if (user.email !== email) {
                const emailExists = await verifyEmailExists(email);

                if (emailExists) {
                    return res.status(400).json({ message: "Email já cadastrado" });
                }
            }

            const team = await teamRepository.findOne({
                where: { team_id }
            });

            if (!team) return res.status(404).json('Team not found');

            const group = await groupRepository.findOneBy({ group_id });

            if (!group) return res.status(404).json('Group not found');

            user.name = name;
            user.email = email;
            user.password = password;
            user.team = team;
            user.group = group;
            user.gender = gender;

            await userRepository.save(user);

            return res.status(201).json(user);
        }
        catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { user_id } = req.params;

        try {
            const user = await userRepository.findOne({
                where: { user_id }
            });

            if (!user) return res.status(404).json('User not found');

            await userRepository.remove(user);

            return res.status(201).json({
                message: "User succesfully deleted.",
                user
            });
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }
}