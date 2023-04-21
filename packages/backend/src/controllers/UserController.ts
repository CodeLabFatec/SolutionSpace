import { verifyEmailExists } from '../utils/verifyEmailExists';
import { teamRepository } from '../repos/postgres/repositories/teamRepository';
import { userRepository } from '../repos/postgres/repositories/userRepository';
import { Request, Response } from 'express';
import { dataDecript } from '../utils/encryptor';

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const { team_id } = req.params;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All properties as required to create an User' });
        }

        try {
            const team = await teamRepository.findOneBy({ team_id });

            if (!team) return res.status(404).json('Team not found');

            const newUser = userRepository.create({ name, email, password, team });

            await userRepository.save(newUser);

            return res.status(201).json(newUser);
        } catch (error) {
            if (error.detail.includes('already exists')) {
                return res.status(409).json({ message: `Internal Server Error - Email already exists` });
            }
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async listUser(req: Request, res: Response) {
        try {
            const users = await userRepository.find({
                relations: { team: true }
            });

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
                relations: { team: true }
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
        const { name, email, password, team_id } = req.body;
        const { user_id } = req.params;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All properties as required to edit an User' });
        }

        try {
            const user = await userRepository.findOne({
                where: { user_id },
                relations: { team: true }
            });

            if (!user) return res.status(404).json('User not found');

            if (user.email !== email) {
                const emailExists = await verifyEmailExists(email);

                if (emailExists) {
                    return res.status(400).json({ message: "The email already exists in database" });
                }
            }

            const team = await teamRepository.findOne({
                where: { team_id }
            });

            if (!team) return res.status(404).json('Team not found');

            user.name = name;
            user.email = email;
            user.password = email;
            user.team = team;

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
                where: { user_id },
                relations: { team: true }
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