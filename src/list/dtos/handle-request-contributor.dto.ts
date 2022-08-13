import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class HandleRequestContributorDto {
  @IsString()
  @IsNotEmpty({ message: 'id is not empty' })
  id: string;

  @IsInt()
  @IsNotEmpty({ message: 'statement is not empty' })
  @Min(0)
  @Max(2)
  statement: number;
}
