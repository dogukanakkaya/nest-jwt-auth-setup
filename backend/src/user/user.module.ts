import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EncryptModule } from '../encrypt/encrypt.module';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    EncryptModule
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
