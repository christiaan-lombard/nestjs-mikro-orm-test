import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CatRepository } from '../repositories/cat.repository';

@Entity({ customRepository: () => CatRepository })
export class Cat {
  [EntityRepositoryType]?: CatRepository;
  @PrimaryKey()
  id: number;

  @Property()
  name: string;
}
