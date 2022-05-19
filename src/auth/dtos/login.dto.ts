import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'username is not empty' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'password is not empty' })
  password: string;
}
