import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class VoteStarDto {
  @IsString()
  @IsNotEmpty({ message: 'listId is not empty' })
  listId: string;

  @IsNotEmpty({ message: 'star is not empty' })
  @Min(0.5)
  @Max(5)
  star: number;
}
