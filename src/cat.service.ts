import { EntityManager } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { CatRepository } from './repositories/cat.repository';

@Injectable()
export class CatService {
  constructor(
    public readonly em: EntityManager,
    public readonly repo: CatRepository,
  ) {}

  compareEntityManagers() {
    return this.em.id === this.repo.getEntityManager().id;
  }
}
