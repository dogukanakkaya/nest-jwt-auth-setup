import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.types';
import { Payload } from './auth.types';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<Omit<User, 'password'>> {
        const user = await this.usersService.findOne(email);

        if (user && user.password === password) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async login(email: string, password: string): Promise<{ token: string }> {
        const user = await this.validateUser(email, password);

        if (user) {
            const payload: Payload = { email, sub: user.id };

            return {
                token: this.jwtService.sign(payload),
            };
        }

        throw new Error('Wrong credentials!')
    }
}
