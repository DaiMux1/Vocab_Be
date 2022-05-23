import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class HandleRequestPublicDto {
  @IsString()
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @IsInt()
  @IsNotEmpty({ message: 'statement is not empty' })
  @Min(0)
  @Max(2)
  statement: number;
}