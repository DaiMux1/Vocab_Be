import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import server from './config/server.config';
import database from './config/database.config';
import { AuthMiddleware } from './auth/auth.middleware';
import { ListModule } from './list/list.module';
import { PublicGateway } from './gateways/public.gateways';
import { MailerModule } from '@nestjs-modules/mailer';
// import { OAuth2Client } from 'google-auth-library';

// const configOAuth2 = async () => {
//   const GOOGLE_MAILER_CLIENT_ID =
//     '866157595408-5m3ap9hjch0b5rmvdngg1qg1sj1mje9f.apps.googleusercontent.com';
//   const GOOGLE_MAILER_CLIENT_SECRET = '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';
//   const GOOGLE_MAILER_REFRESH_TOKEN =
//     '1//04IaJoYF44yFvCgYIARAAGAQSNwF-L9Ir0Iew55CYrTGWivpyXHuG-iZwV6kHVRzRYV7PKVebZiAg6oTu0ZGmlCG5kLZ8wCIcpks';
//   const ADMIN_EMAIL_ADDRESS = 'dailv2khn@gmail.com';
//   // Khởi tạo OAuth2Client với Client ID và Client Secret
//   const myOAuth2Client = new OAuth2Client(
//     GOOGLE_MAILER_CLIENT_ID,
//     GOOGLE_MAILER_CLIENT_SECRET,
//   );
//   // Set Refresh Token vào OAuth2Client Credentials
//   myOAuth2Client.setCredentials({
//     refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
//   });
// };

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [server, database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        url: config.get('db.url'),
        useNewUrlParser: true,
        synchronize: true,
        logging: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    UserModule,
    AuthModule,
    ListModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          service: 'Gmail',
          port: parseInt(process.env.SMTP_PORT, 10) || 587,
          requireTLS: true,
          secure: false,
          requireSSL: true,
          auth: {
            user: 'dailv2khn@gmail.com',
            pass: 'yirlswmxjphegmoh',
          },
          connectionTimeout: 30 * 1000,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PublicGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/(.*)', method: RequestMethod.ALL },
        // { path: 'auth/signin', method: RequestMethod.POST },
        // { path: 'auth/signup', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
