import { EntityRepository } from '@mikro-orm/mysql';
import type { Cat } from '../entities/cat.entity';

export class CatRepository extends EntityRepository<Cat> {
  getEntityManager() {
    return this.em;
  }
}
