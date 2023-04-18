import { userRepository } from "../repos/postgres/repositories/userRepository";

export async function verifyEmailExists(email: string): Promise<boolean> {
    const user = await userRepository.findOne({
        where: { email }
    });

    if (!user) return false;

    return true;
}