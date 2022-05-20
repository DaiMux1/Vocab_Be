import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async use(req, res, next) {
    const token = req.header('Authorization');
    try {
      const user = await this.jwtService.verify(token);
      req.user = user;
      next();
    } catch (e) {
      console.log(e);
      
        throw new UnauthorizedException('Token is invalid')
    }
  }
}
