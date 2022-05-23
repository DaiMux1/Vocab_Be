import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entity/list.entity';
import { RequestPublic } from './entity/request.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([List, RequestPublic])],
  providers: [ListService],
  controllers: [ListController]
})
export class ListModule {}
