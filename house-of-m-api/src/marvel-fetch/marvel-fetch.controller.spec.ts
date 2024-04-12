import { Test, TestingModule } from '@nestjs/testing';
import { MarvelFetchController } from './marvel-fetch.controller';

describe('MarvelFetchController', () => {
  let controller: MarvelFetchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarvelFetchController],
    }).compile();

    controller = module.get<MarvelFetchController>(MarvelFetchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
