import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyPassDto {
  @IsString()
  @IsNotEmpty({ message: 'token is not empty' })
  token: string;

  @IsString()
  @IsNotEmpty({ message: 'newPass is not empty' })
  newPass: string;
}
