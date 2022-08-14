import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { VerifyPassDto } from './dtos/verifyPass.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findAccountByUsername(username);
    if (!user) throw new BadRequestException('User or password is invalid');

    const validated = await bcrypt.compare(password, user.password);
    if (validated) {
      user.password = undefined;
      return user;
    }
    throw new BadRequestException('User or password is invalid');
  }

  async login(user: User): Promise<any> {
    const payload = {
      role: user.role,
      username: user.username,
      id: user.id,
      status: user.status,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyEmail(token: string) {
    const { email } = await this.jwtService.verify(token);
    const user = await this.userService.findAccoutByEmail(email);
    if (!user) {
      throw new BadRequestException('Email is invalid');
    }
    user.status = 1;
    await this.userService.save(user);
    return 'Kích hoạt thành công tài khoản. Mời bạn đăng nhập vào hệ thống!';
  }

  async verifyForgotPass(body: VerifyPassDto) {
    console.log({ token: body.token });

    const { email } = await this.jwtService.verify(body.token);
    const user = await this.userService.findAccoutByEmail(email);
    if (!user) {
      throw new BadRequestException('Email is invalid');
    }
    user.password = await bcrypt.hash(body.newPass, 10);
    await this.userService.save(user);
    return user;
  }
}
