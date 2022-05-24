import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Vocab } from '../entity/vocab.entity';
import { VocabDto } from './vocab.dto';

export class RequestContributorDto {
  @IsString()
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VocabDto)
  vocab?: Vocab[];
}
