import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Person } from './person.entity';
import { Vocab } from './vocab.entity';

@Entity()
export class RequestContributor {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  listId: string;

  @Column()
  author: string;

  @Column()
  contributor: Person;

  @Column()
  status: number;

  @Column((type) => Vocab)
  vocab: Vocab[];
}
