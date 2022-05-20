import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get('whoami')
    whoami(@Req() req) {
        return req.user
    }
}
