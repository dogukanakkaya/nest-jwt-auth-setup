import { Injectable } from '@nestjs/common';
import { User } from './users.types';

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            email: 'doguakkaya27@gmail.com',
            password: '123456',
        },
        {
            id: 2,
            email: 'test@gmail.com',
            password: '1234',
        },
    ];

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }
}