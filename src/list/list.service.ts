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
import { ObjectID } from 'mongodb';
import { UpdateNameList } from './dtos/update-name-list.dto';
import { clearConfigCache } from 'prettier';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepo: MongoRepository<List>,
    @InjectRepository(RequestPublic)
    private reqPublicRepo: MongoRepository<RequestPublic>,
    @InjectRepository(RequestContributor)
    private reqContributorRepo: MongoRepository<RequestContributor>,
    @InjectRepository(User)
    private userRepo: MongoRepository<User>,
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

  async getMyList(user, search: string) {
    return await this.listRepo.find({
      where: {
        name: { $regex: new RegExp(search, 'i') },
        'author.username': { $regex: new RegExp(user.username, 'i') },
      },
    });
  }

  async getMyFavoritesList(user, search) {
    const userDoc = await this.userRepo.findOne({ username: user.username });
    if (!userDoc) {
      throw new BadRequestException('Username not found');
    }

    const listIds = userDoc.favoritesList.map((listid) => ObjectID(listid));

    return await this.listRepo.find({ where: { _id: { $in: listIds } } });
  }

  async findById(user, id: string) {
    return await this.listRepo.findOne({
      where: {
        _id: new ObjectID(id),
        // 'author.username': { $regex: new RegExp(user.username, 'i') },
      },
    });
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

  async removeList(user, id: string) {
    const list = await this.listRepo.findOne({
      where: {
        _id: new ObjectID(id),
        'author.username': user.username,
      },
    });
    if (!list) {
      throw new BadRequestException('You have not this list');
    }

    return await this.listRepo.deleteOne({ _id: new ObjectID(id) });
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

  async updateList(user, body: UpdateNameList) {
    const list = await this.listRepo.findOne({
      where: {
        _id: new ObjectID(body.id),
        'author.username': user.username,
      },
    });
    if (!list) {
      throw new BadRequestException('You have not this list');
    }

    list.name = body.newName;

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
        public: 2,
      },
      skip: (Number(query.page) - 1) * Number(query.perPage),
      take: Number(query.perPage),
    });
  }

  async voteStar(user, body: VoteStarDto) {
    const list = await this.listRepo.findOne({
      where: { _id: ObjectID(body.listId) },
    });
    console.log('list', list);
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

  async requestPublic(user, id: string) {
    const list = await this.listRepo.findOne({
      where: {
        _id: new ObjectID(id),
        'author.username': user.username,
      },
    });
    if (!list) {
      throw new BadRequestException('You have not this list');
    }

    // update list = 1 la state requested
    list.public = 1;
    await this.listRepo.save(list);

    let request = await this.reqPublicRepo.findOne({
      listId: id,
      status: StatusRequestPublic.Pending,
    });
    if (request) {
      throw new BadRequestException('List is pending');
    }

    request = this.reqPublicRepo.create({
      listId: id,
      moderater: '',
      status: StatusRequestPublic.Pending,
      author: user.username,
    });
    return await this.reqPublicRepo.save(request);
  }

  async handleRequestPublic(user, listId: string, status: StatusRequestPublic) {
    const request = await this.reqPublicRepo.findOne({
      listId,
      status: StatusRequestPublic.Pending,
    });
    if (!request) {
      throw new BadRequestException('Request not found');
    }

    request.status = status;
    request.moderater = user.username;
    await this.reqPublicRepo.save(request);

    const list = await this.listRepo.findOne(listId);

    list.public = status === 1 ? 0 : 2;

    return await this.listRepo.save(list);
  }

  async requestContributor(user, listId: string, vocab: VocabDto[]) {
    const list = await this.listRepo.findOne({
      where: {
        _id: new ObjectID(listId),
      },
    });
    if (!list) {
      throw new BadRequestException('List not found');
    }

    const request = this.reqContributorRepo.create({
      listId: listId,
      status: StatusRequestPublic.Pending,
      author: list.author.username,
      contributor: user,
      vocab: vocab,
    });
    request.vocab = vocab;
    return await this.reqContributorRepo.save(request);
  }

  async handleRequestContributor(
    user,
    id: string,
    status: StatusRequestPublic,
  ) {
    const request = await this.reqContributorRepo.findOne({
      where: {
        _id: new ObjectID(id),
      },
    });
    if (!request) {
      throw new BadRequestException('Request not found');
    }

    request.status = status;
    await this.reqContributorRepo.save(request);

    if (status === StatusRequestPublic.Rejected) return;

    const list = await this.listRepo.findOne({
      where: {
        _id: new ObjectID(request.listId),
      },
    });

    list.vocab.push(...request.vocab);
    list.contributor = list.contributor || [];
    list.contributor.push(request.contributor);
    return await this.listRepo.save(list);
  }

  async findRequestPublic() {
    return await this.reqPublicRepo.find({
      status: StatusRequestPublic.Pending,
    });
  }

  async findRequestContributor(user) {
    return await this.reqContributorRepo.find({
      author: user.username,
      status: StatusRequestPublic.Pending,
    });
  }

  async findOneRequestContributor(user, contributorId) {
    const requestContributor = await this.reqContributorRepo.findOne({
      where: {
        _id: new ObjectID(contributorId),
      },
    });

    if (!requestContributor) {
      throw new BadRequestException('Request not found');
    }

    const list = await this.listRepo.findOne({
      where: {
        _id: new ObjectID(requestContributor.listId),
      },
    });

    return { requestContributor, list };
  }
}
