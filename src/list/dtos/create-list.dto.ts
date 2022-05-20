import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Vocab } from '../entity/vocab.entity';
import { VocabDto } from './vocab.dto';

export class CreateListDto {
  @IsString()
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VocabDto)
  vocab?: Vocab[];
}
