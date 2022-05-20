import { Column } from "typeorm";


export class Vocab {
    @Column()
    word: string;

    @Column()
    meaning: string;

    @Column()
    example: string;
}