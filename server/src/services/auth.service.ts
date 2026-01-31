import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../models/user.model';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(userData: Partial<IUser>): Promise<IUser> {
        const existingUser = await this.userRepository.findByEmail(userData.email!);
        if (existingUser) {
            throw { status: 400, message: 'User already exists' };
        }

        const hashedPassword = await bcrypt.hash(userData.password!, 10);
        return this.userRepository.create({ ...userData, password: hashedPassword });
    }

    async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw { status: 401, message: 'Invalid credentials' };
        }

        const isMatch = await bcrypt.compare(password, user.password!);
        if (!isMatch) {
            throw { status: 401, message: 'Invalid credentials' };
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        return { user, token };
    }
}
