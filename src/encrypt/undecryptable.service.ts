import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UndecryptableService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    async encrypt(value: string): Promise<string> {
        return bcrypt.hash(value, Number(this.configService.get<number>('encrypt.saltRounds', 10)));
    }

    async check(value, encrypted): Promise<boolean> {
        return bcrypt.compare(value, encrypted);
    }
}
