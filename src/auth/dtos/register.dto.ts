import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'username is not empty' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'password is not empty' })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is not empty' })
  email: string;
}
