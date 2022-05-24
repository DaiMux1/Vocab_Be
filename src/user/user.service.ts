import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/constant/role';
import { UserStatus } from 'src/constant/user-status';
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

  async findAccountByUsername(username: string) {
    return await this.userRepo.findOne({ username });
  }

  async addManager(username: string) {
    const user = await this.userRepo.findOne({ username });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.role = Role.Manager;
    return await this.userRepo.save(user);
  }

  async ban(username: string) {
    const user = await this.userRepo.findOne({ username });
    if (!user) {
      throw new BadRequestException('Username not found');
    }
    if (user.status === UserStatus.Ban) {
      throw new BadRequestException('User already ban');
    }

    user.status = UserStatus.Ban;
    return await this.userRepo.save(user);
  }

  async unban(username: string) {
    const user = await this.userRepo.findOne({ username });
    if (!user) {
      throw new BadRequestException('Username not found');
    }
    if (user.status === UserStatus.Active) {
      throw new BadRequestException('User already active');
    }

    user.status = UserStatus.Active;
    return await this.userRepo.save(user);
  }
}
