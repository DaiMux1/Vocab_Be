import {
  BeforeInsert,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  status: number;

  @Column({ default: 0 })
  role: number;

  @Column()
  favoritesList: string[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
