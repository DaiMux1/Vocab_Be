import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class UpdateNameList {
  @IsString()
  @IsNotEmpty({ message: 'id is not empty' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'newName is not empty' })
  newName: string;
}
