import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { Payload } from './auth.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<Omit<User, 'password'>> {
        const user = await this.userService.findOne(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async login(email: string, password: string): Promise<{ token: string }> {
        const user = await this.validateUser(email, password);

        if (user) {
            const payload: Payload = { email };

            return {
                token: this.jwtService.sign(payload),
            };
        }

        throw new Error('Wrong credentials!')
    }
}
