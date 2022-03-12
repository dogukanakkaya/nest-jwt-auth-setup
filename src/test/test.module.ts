import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { EncryptModule } from '../encrypt/encrypt.module';

let mongoMemoryServer: MongoMemoryServer

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV || 'dev'}.env`,
            load: [configuration]
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                mongoMemoryServer = await MongoMemoryServer.create();
                const uri = mongoMemoryServer.getUri();

                return {
                    uri,
                    connectionName: configService.get<string>('mongo.connection', (Math.random() + 1).toString(36).substring(7))
                }
            }
        }),
        EncryptModule
    ]
})
export class TestModule { }

export { mongoMemoryServer }