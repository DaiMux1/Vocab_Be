import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusRequestPublic } from 'src/constant/status-request-public';
import { Like, MongoRepository } from 'typeorm';
import { CreateListDto } from './dtos/create-list.dto';
import { DeleteVocabDto } from './dtos/delete-vocab.dto';
import { SearchDto } from './dtos/search.dto';
import { UpdateVocabDto } from './dtos/update-vocab.dto';
import { VocabDto } from './dtos/vocab.dto';
import { VoteStarDto } from './dtos/vote-star.dto';
import { List } from './entity/list.entity';
import { RequestContributor } from './entity/request-comtributor.entity';
import { RequestPublic } from './entity/request-public.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepo: MongoRepository<List>,
    @InjectRepository(RequestPublic)
    private reqPublicRepo: MongoRepository<RequestPublic>,
    @InjectRepository(RequestContributor)
    private reqContributorRepo: MongoRepository<RequestContributor>,
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

    list.vocab[vocabIndex] = { ...list.vocab[vocabIndex], ...body.newVocab };

    return await this.listRepo.save(list);
  }

  async search(query: SearchDto) {
    return await this.listRepo.find({
      where: {
        name: { $regex: new RegExp(query.name, 'i') },
        'author.username': { $regex: new RegExp(query.author, 'i') },
      },
    });
  }

  async voteStar(user, body: VoteStarDto) {
    const list = await this.listRepo.findOne({ name: body.name });
    if (!list) {
      throw new BadRequestException('List not found');
    }

    list.voters = list.voters || [];

    const voterIndex = list.voters.findIndex(
      (v) => v.username === user.username,
    );
    if (voterIndex === -1) {
      list.voters.push({
        ...user,
        star: body.star,
      });
    } else {
      list.voters[voterIndex] = { ...list.voters[voterIndex], star: body.star };
    }

    list.star = list.star || 0;
    list.star =
      list.voters.reduce((pre, cur) => (pre += cur.star), 0) /
      list.voters.length;

    await this.listRepo.save(list);
    return list;
  }

  async requestPublic(user, name: string) {
    const list = await this.listRepo.findOne({
      where: {
        name: name,
        'author.username': user.username,
      },
    });
    if (!list) {
      throw new BadRequestException('You have not this list');
    }

    let request = await this.reqPublicRepo.findOne({
      listName: name,
      status: StatusRequestPublic.Pending,
    });
    if (request) {
      throw new BadRequestException('List is pending');
    }

    request = this.reqPublicRepo.create({
      listName: name,
      moderater: '',
      status: StatusRequestPublic.Pending,
      author: user.username,
    });
    return await this.reqPublicRepo.save(request);
  }

  async handleRequestPublic(user, name: string, status: StatusRequestPublic) {
    const request = await this.reqPublicRepo.findOne({
      listName: name,
      status: StatusRequestPublic.Pending,
    });
    if (!request) {
      throw new BadRequestException('Request not found');
    }

    request.status = status;
    request.moderater = user.username;
    await this.reqPublicRepo.save(request);

    if (status === StatusRequestPublic.Rejected) return

    const list = await this.listRepo.findOne({
      where: {
        name: request.listName,
        'author.username': request.author,
      },
    });

    list.public = 1;

    return await this.listRepo.save(list);
  }

  async requestContributor(user, name: string, vocab: VocabDto[]) {
    const list = await this.listRepo.findOne({
      where: {
        name: name,
      },
    });
    if (!list) {
      throw new BadRequestException('List not found');
    }


    const request = this.reqContributorRepo.create({
      listName: name,
      status: StatusRequestPublic.Pending,
      author: list.author.username,
      contributor: user,
      vocab: vocab,
    });
    request.vocab = vocab;
    return await this.reqContributorRepo.save(request);
  }

  async handleRequestContributor(user, name: string, status: StatusRequestPublic) {
    const request = await this.reqContributorRepo.findOne({
      listName: name,
      author: user.username,
      status: StatusRequestPublic.Pending,
    });
    if (!request) {
      throw new BadRequestException('Request not found');
    }

    request.status = status;
    await this.reqContributorRepo.save(request);

    if (status === StatusRequestPublic.Rejected) return

    const list = await this.listRepo.findOne({
      where: {
        name: request.listName,
        'author.username': request.author,
      },
    });

    list.vocab.push(...request.vocab);
    list.contributor = list.contributor || [];
    list.contributor.push(request.contributor)
    return await this.listRepo.save(list);

  }
}
