import { Column } from "typeorm";
import { Person } from "./person.entity";


export class Voter extends Person {
    @Column()
    star: number
}