import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://dailv:12345@parking-system.viixj.mongodb.net/vocab?authSource=admin&replicaSet=atlas-znt7nh-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
      useNewUrlParser: true,
      synchronize: true,
      logging: true,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
