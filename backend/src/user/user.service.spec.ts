import { ConfigService } from '@nestjs/config';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { mongoMemoryServer, TestModule } from '../test/test.module';
import { EncryptModule } from '../encrypt/encrypt.module';

describe('UserService', () => {
    let userService: UserService;
    let configService: ConfigService;
    let connection: Connection;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TestModule,
                MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
                EncryptModule
            ],
            providers: [UserService],
        }).compile();

        userService = module.get<UserService>(UserService);
        configService = module.get<ConfigService>(ConfigService);
        connection = await module.get<Connection>(getConnectionToken());

        // create test user
        await userService.create({
            email: configService.get<string>('TEST_USER_EMAIL'),
            password: configService.get<string>('TEST_USER_PASSWORD')
        });
    });

    it('should return existing user', async () => {
        const email = configService.get<string>('TEST_USER_EMAIL');
        const password = configService.get<string>('TEST_USER_PASSWORD');

        const user = await userService.findOne(email);

        expect(user).toBeDefined();
        expect(user.email).toBe(email);
        expect(await userService.checkPassword(password, user.password)).toBe(true);
    });

    it('should return non existing user', async () => {
        const email = 'some_non_existing_email@example.com';

        const user = await userService.findOne(email);

        expect(user).toBeNull();
    });

    afterAll(async () => {
        await connection.close();
        await mongoMemoryServer.stop();
    });
});