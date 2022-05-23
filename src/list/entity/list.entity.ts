import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Person } from './person.entity';
import { Vocab } from './vocab.entity';
import { Voter } from './voter.entity';

@Entity()
export class List {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column((type) => Person)
  author: Person;

  @Column((type) => Person)
  contributor: Person[];

  @Column((type) => Vocab)
  vocab: Vocab[];

  @Column()
  public: number;

  @Column()
  star: number;

  @Column((type) => Voter)
  voters: Voter[]
}
