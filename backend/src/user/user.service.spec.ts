import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', async () => {
    const nonExistentUser = await service.findOne('nonexistentmail@example.com');
    expect(nonExistentUser).toBeUndefined()
  });
});
