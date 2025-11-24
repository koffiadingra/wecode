import { Test, TestingModule } from '@nestjs/testing';
import { ArtisteController } from './artiste.controller';
import { ArtisteService } from './artiste.service';

describe('ArtisteController', () => {
  let controller: ArtisteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtisteController],
      providers: [ArtisteService],
    }).compile();

    controller = module.get<ArtisteController>(ArtisteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
