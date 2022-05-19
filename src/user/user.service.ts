import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: MongoRepository<User>,
  ) {}

  async create(body: CreateUserDto) {
    const user = await this.userRepo.create(body);
    user.role = 0;
    user.status = 1;
    return await this.userRepo.save(user);
  }

  async findAccount(username: string) {
    console.log(username, "123");
    
    const r = await this.userRepo.find();
    console.log(r);
    return r;
    
  }
}
