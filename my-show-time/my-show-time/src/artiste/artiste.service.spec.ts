import { Test, TestingModule } from '@nestjs/testing';
import { ArtisteService } from './artiste.service';

describe('ArtisteService', () => {
  let service: ArtisteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtisteService],
    }).compile();

    service = module.get<ArtisteService>(ArtisteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
