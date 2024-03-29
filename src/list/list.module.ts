import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entity/list.entity';
import { RequestPublic } from './entity/request-public.entity';
import { RequestContributor } from './entity/request-comtributor.entity';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([List, RequestPublic, RequestContributor, User]),
  ],
  providers: [ListService],
  controllers: [ListController],
})
export class ListModule {}
