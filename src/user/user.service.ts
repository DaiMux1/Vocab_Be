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
    user.status = 0;
    return await this.userRepo.save(user);
  }

  async findAccountByUsername(username: string) {
    return await this.userRepo.findOne({ username });
  }

  async findAccoutByEmail(email: string) {
    return await this.userRepo.findOne({ email });
  }

  async save(user) {
    return await this.userRepo.save(user);
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

  async addFavoriteList(user, listId) {
    const u = await this.userRepo.findOne({ username: user.username });
    if (!u) {
      throw new BadRequestException('Username not found');
    }

    if (!u.favoritesList) {
      u.favoritesList = [];
    }

    if (!u.favoritesList.includes(listId)) {
      u.favoritesList.push(listId);
    }

    return await this.userRepo.save(u);
  }

  async removeFavoriteList(user, listId) {
    const u = await this.userRepo.findOne({ username: user.username });
    if (!u) {
      throw new BadRequestException('Username not found');
    }

    if (!u.favoritesList) {
      u.favoritesList = [];
    }

    if (u.favoritesList.includes(listId)) {
      u.favoritesList = u.favoritesList.filter((list) => list !== listId);
    }

    return await this.userRepo.save(u);
  }

  async getMyFavoritesList(user) {
    console.log('user', user);
    const u = await this.userRepo.findOne({ username: user.username });
    if (!u) {
      throw new BadRequestException('Username not found');
    }
    if (!u.favoritesList) {
      return [];
    }
    return u.favoritesList;
  }
}
