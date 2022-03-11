import { LeanDocument } from 'mongoose';
import { UserDocument } from '../user/user.schema';

export interface Payload {
    email: string;
}

export type AuthenticatedUser = Omit<LeanDocument<UserDocument>, 'password'>