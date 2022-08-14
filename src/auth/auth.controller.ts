import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/utls/sendMail';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { VerifyPassDto } from './dtos/verifyPass.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  @Post('/signin')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    if (user.status === 0) {
      throw new BadRequestException(
        'Bạn chưa xác nhận email. Vui lòng vào email để xác nhận',
      );
    }

    if (user) {
      return await this.authService.login(user);
    }
  }

  // @Post('/signup')
  // async signup(@Body() body: LoginDto) {
  //   const user = await this.userService.findAccountByUsername(body.username);
  //   if (user) {
  //     throw new BadRequestException('Username already exists');
  //   }
  //   const newUser = await this.userService.create(body);
  //   return await this.authService.login(newUser);
  // }

  @Post('/signup')
  async signup(@Body() body: RegisterDto) {
    const username = await this.userService.findAccountByUsername(
      body.username,
    );
    if (username) {
      throw new BadRequestException('Username already exists');
    }

    const userEmail = await this.userService.findAccoutByEmail(body.email);
    console.log('userEmail', userEmail);
    if (userEmail) {
      throw new BadRequestException('Email already exists');
    }

    const newUser = await this.userService.create(body);

    const payload = {
      email: newUser.email,
      id: newUser.id.toString(),
    };

    const access_token = this.jwtService.sign(payload);

    const content = this.mailService.getVerifyEmailTemplate(
      `http://localhost:5000/auth/verify-email/${access_token}`,
      newUser,
    );

    console.log('will Send');
    await this.mailService.sendVerifyEmail(
      newUser.email,
      'Verify Email',
      content,
    );

    console.log('Sended');

    delete newUser.password;
    return newUser;
  }

  @Post('/forgot-pass')
  async forgotPass(@Body('email') email: string) {
    const userEmail = await this.userService.findAccoutByEmail(email);
    console.log('userEmail', userEmail);
    if (!userEmail) {
      throw new BadRequestException('Email không đăng ký cho tài khoản nào ');
    }

    const payload = {
      email: userEmail.email,
      id: userEmail.id.toString(),
    };

    const access_token = this.jwtService.sign(payload);

    console.log(access_token, 'access_token');

    const content = this.mailService.getForgotPassTemplate(
      `http://localhost:3000/new-password-when-fotgot/${access_token}`,
      userEmail,
    );

    await this.mailService.sendVerifyEmail(email, 'Verify Email', content);
    delete userEmail.password;

    return userEmail;
  }

  @Post('verify-forgot-pass')
  verifyForgotPass(@Body() body: VerifyPassDto) {
    console.log('body', body);
    return this.authService.verifyForgotPass(body);
  }

  @Get('verify-email/:token')
  verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}
