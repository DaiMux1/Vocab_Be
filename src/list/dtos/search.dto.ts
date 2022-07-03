import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsString()
  page: string;

  @IsString()
  perPage: string;
}
