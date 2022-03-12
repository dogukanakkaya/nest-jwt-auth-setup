import { Global, Module } from '@nestjs/common';
import { UndecryptableService } from './undecryptable.service';

@Global()
@Module({
    providers: [UndecryptableService],
    exports: [UndecryptableService]
})
export class EncryptModule { }
