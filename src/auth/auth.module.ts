import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from '../utls/sendMail';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('secret'),
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
