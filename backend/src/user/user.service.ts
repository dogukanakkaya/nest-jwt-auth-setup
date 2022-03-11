import { Injectable } from '@nestjs/common';
import { User } from './user.types';

@Injectable()
export class UserService {
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