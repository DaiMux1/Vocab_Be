import { Column } from "typeorm";

export class Person {
  
    @Column()
    username: string;
  
    @Column({ default: 1 })
    status: number;
  
    @Column({ default: 0 })
    role: number;
  }