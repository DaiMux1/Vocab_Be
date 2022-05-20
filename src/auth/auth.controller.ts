import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signin')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    if (user) {
      return await this.authService.login(user);
    }
  }

  @Post('/signup')
  async signup(@Body() body: LoginDto) {
    const user = await this.userService.findAccountByUsername(body.username);
    if (user) {
      throw new BadRequestException('Username already exists');
    }
    const newUser = await this.userService.create(body);
    return await this.authService.login(newUser);
  }
}
