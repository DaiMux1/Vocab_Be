import { IsString } from "class-validator";

export class VocabDto {
    @IsString()
    word: string;

    @IsString()
    meaning: string;

    @IsString()
    example: string;
}