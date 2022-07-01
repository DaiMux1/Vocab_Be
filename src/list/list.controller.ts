import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Role } from 'src/constant/role';
import { RoleG } from 'src/guards/role.guard';
import { RequestContributorDto } from './dtos/create-contributor.dto';
import { CreateListDto } from './dtos/create-list.dto';
import { DeleteVocabDto } from './dtos/delete-vocab.dto';
import { HandleRequestPublicDto } from './dtos/handle-request-public.dto';
import { SearchDto } from './dtos/search.dto';
import { UpdateVocabDto } from './dtos/update-vocab.dto';
import { VoteStarDto } from './dtos/vote-star.dto';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Post('new')
  create(@Req() req, @Body() body: CreateListDto) {
    return this.listService.create(req.user, body);
  }

  @Post()
  addVocab(@Req() req, @Body() body: CreateListDto) {
    return this.listService.addVocab(req.user, body);
  }

  @Delete()
  removeList(@Req() req, @Body() id: string) {
    return this.listService.removeList(req.user, id);
  }

  @Delete('/vocab')
  removeVocab(@Req() req, @Body() body: DeleteVocabDto) {
    return this.listService.removeVocab(req.user, body);
  }

  @Put()
  updateVocab(@Req() req, @Body() body: UpdateVocabDto) {
    return this.listService.updateVocab(req.user, body);
  }

  @Get('my-list')
  getMyList(@Req() req, @Query('search') search: string) {
    return this.listService.getMyList(req.user, search);
  }

  @Get('search')
  search(@Query() query: SearchDto) {
    return this.listService.search(query);
  }

  @Patch('star')
  vote(@Req() req, @Body() body: VoteStarDto) {
    return this.listService.voteStar(req.user, body);
  }

  @Post('request_public/:name')
  requestPublic(@Req() req, @Param('name') name: string) {
    return this.listService.requestPublic(req.user, name);
  }

  @RoleG(Role.Manager)
  @Patch('handle_request_public')
  handleRequestPublic(@Req() req, @Body() body: HandleRequestPublicDto) {
    return this.listService.handleRequestPublic(
      req.user,
      body.name,
      body.statement,
    );
  }

  @Post('request_contributor')
  requestContributor(@Req() req, @Body() body: RequestContributorDto) {
    return this.listService.requestContributor(req.user, body.name, body.vocab);
  }

  @Patch('handle_request_contributor')
  handleRequestContributor(@Req() req, @Body() body: HandleRequestPublicDto) {
    return this.listService.handleRequestContributor(
      req.user,
      body.name,
      body.statement,
    );
  }
}
