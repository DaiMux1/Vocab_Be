import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Vocab } from '../entity/vocab.entity';
import { VocabDto } from './vocab.dto';

export class DeleteVocabDto {
  @IsString()
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @IsObject()
  @Type(() => VocabDto)
  vocab?: Vocab;
}