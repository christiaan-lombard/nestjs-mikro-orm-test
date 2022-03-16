import { EntityManager } from '@mikro-orm/mysql';
import { ContextId, ContextIdFactory } from '@nestjs/core';
import { REQUEST_CONTEXT_ID } from '@nestjs/core/router/request/request-constants';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { Cat } from './entities/cat.entity';
import { CatRepository } from './repositories/cat.repository';

describe('AppModule', () => {
  let module: TestingModule;
  let contextId: ContextId;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    contextId = ContextIdFactory.create();

    module.registerRequestByContextId(
      { [REQUEST_CONTEXT_ID]: contextId },
      contextId,
    );
  });

  afterAll(async () => await module.close());

  it('resolves same EntityManager', async () => {
    const em = await module.resolve<EntityManager>(EntityManager, contextId);
    const em2 = await module.resolve<EntityManager>(EntityManager, contextId);

    expect(em.id).toBe(em2.id);
    expect(em).toStrictEqual(em2);
  });

  it('resolves same EntityManager for repositories created by EM', async () => {
    const em = await module.resolve<EntityManager>(EntityManager, contextId);
    const repo = em.getRepository(Cat);
    expect(repo).toBeInstanceOf(CatRepository);
    expect(em.id).toBe(repo.getEntityManager().id);
    expect(em).toStrictEqual(repo.getEntityManager());
  });

  it('resolves same EntityManager for repositories', async () => {
    const em = await module.resolve<EntityManager>(EntityManager, contextId);
    const repo = await module.resolve<CatRepository>(CatRepository, contextId);

    expect(em.id).toBe(repo.getEntityManager().id); // fails
  });
});
