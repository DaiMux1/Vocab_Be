import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Vocab } from '../entity/vocab.entity';
import { VocabDto } from './vocab.dto';
import { PartialType } from '@nestjs/mapped-types'


export class UpdateVocabDto {
  @IsString()
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @IsObject()
  @Type(() => VocabDto)
  oldVocab?: Vocab;

  @IsObject()
  @Type(() => PartialType(VocabDto))
  newVocab?: Vocab;
}

