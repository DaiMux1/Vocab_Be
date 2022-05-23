import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class VoteStarDto {
  @IsString()
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @IsInt()
  @IsNotEmpty({ message: 'star is not empty' })
  @Min(1)
  @Max(5)
  star: number;
}
