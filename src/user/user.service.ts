import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UndecryptableService } from '../encrypt/undecryptable.service';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly encryptService: UndecryptableService
    ) { }

    async create(user: User): Promise<UserDocument> {
        const { password, ...rest } = user;

        return new this.userModel({
            password: await this.encryptService.encrypt(password),
            ...rest
        }).save()
    }

    async findOne(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email });
    }

    async checkPassword(password, encrypted): Promise<boolean> {
        return this.encryptService.check(password, encrypted);
    }
}