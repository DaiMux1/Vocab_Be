import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateListDto } from './dtos/create-list.dto';
import { DeleteVocabDto } from './dtos/delete-vocab.dto';
import { UpdateVocabDto } from './dtos/update-vocab.dto';
import { List } from './entity/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private listRepo: MongoRepository<List>,
  ) {}

  async create(user, body: CreateListDto) {
    const oldList = await this.listRepo.findOne({
      where: { name: body.name, 'author.username': user.username },
    });
    if (oldList) {
      throw new BadRequestException('Name list already exists');
    }

    const list = this.listRepo.create(body);
    list.vocab = body.vocab || [];
    list.author = user;
    list.public = 0;
    list.star = 0;

    return await this.listRepo.save(list);
  }

  async addVocab(user, body: CreateListDto) {
    const list = await this.listRepo.findOne({
      where: {
        name: body.name,
        'author.username': user.username,
      },
    });

    if (!list) {
      throw new BadRequestException('You have not this list');
    }
    list.vocab.push(...body.vocab);

    return await this.listRepo.save(list);
  }

  async removeVocab(user, body: DeleteVocabDto) {
    const list = await this.listRepo.findOne({
      where: {
        name: body.name,
        'author.username': user.username,
      },
    });

    if (!list) {
      throw new BadRequestException('You have not this list');
    }
    list.vocab = list.vocab.filter(
      (v) =>
        v.word !== body.vocab.word ||
        v.example !== body.vocab.example ||
        v.meaning !== body.vocab.meaning,
    );

    return await this.listRepo.save(list);
  }

  async updateVocab(user, body: UpdateVocabDto) {
    const list = await this.listRepo.findOne({
      where: {
        name: body.name,
        'author.username': user.username,
      },
    });

    if (!list) {
      throw new BadRequestException('You have not this list');
    }
    const vocabIndex = list.vocab.findIndex(
      (v) =>
        v.word === body.oldVocab.word &&
        v.example === body.oldVocab.example &&
        v.meaning === body.oldVocab.meaning,
    );

    list.vocab[vocabIndex] = {...list.vocab[vocabIndex], ...body.newVocab}

    return await this.listRepo.save(list);
  }
}
