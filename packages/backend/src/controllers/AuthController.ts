import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { userRepository } from '../repos/postgres/repositories/userRepository';
import { comparePassword } from '../utils/encryptor';

export class AuthController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All properties as required' });
        }

        try {
            const user = await userRepository.findOne({ where: { email }, relations: { team: true } });

            if (!user) return res.status(401).json('Unauthorized - Email not found');

            const isValidPassword = comparePassword(password, user.password);

            if (!isValidPassword) return res.status(401).json('Unauthorized - Incorrect password');

            const token = jwt.sign({ id: user.user_id }, process.env.JWT_PASS as string, { expiresIn: '7d' });

            return res.json({
                user,
                token,
                expiresIn: '7d'
            });
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }
}