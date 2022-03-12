import { Module } from '@nestjs/common';
import { UndecryptableService } from './undecryptable.service';

@Module({
    providers: [UndecryptableService],
    exports: [UndecryptableService]
})
export class EncryptModule { }
