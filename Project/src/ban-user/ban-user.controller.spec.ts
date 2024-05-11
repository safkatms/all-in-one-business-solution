import { Test, TestingModule } from '@nestjs/testing';
import { BanUserController } from './ban-user.controller';
import { BanUserService } from './ban-user.service';

describe('BanUserController', () => {
  let controller: BanUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BanUserController],
      providers: [BanUserService],
    }).compile();

    controller = module.get<BanUserController>(BanUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
