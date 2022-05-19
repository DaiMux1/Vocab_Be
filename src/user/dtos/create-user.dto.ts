import { IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty({message: "username is not empty"})
    username: string;
    
    @IsString()
    @IsNotEmpty({message: "password is not empty"})
    password: string;
}