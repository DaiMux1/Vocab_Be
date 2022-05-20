import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

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
}
