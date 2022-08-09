import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class RequestPublic {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  listId: string;

  @Column()
  author: string;

  @Column()
  moderater: string;

  @Column()
  status: number;
}
