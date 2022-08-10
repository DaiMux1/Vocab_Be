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
import { clearConfigCache } from 'prettier';
import { Role } from 'src/constant/role';
import { RoleG } from 'src/guards/role.guard';
import { RequestContributorDto } from './dtos/create-contributor.dto';
import { CreateListDto } from './dtos/create-list.dto';
import { DeleteVocabDto } from './dtos/delete-vocab.dto';
import { HandleRequestPublicDto } from './dtos/handle-request-public.dto';
import { SearchDto } from './dtos/search.dto';
import { UpdateNameList } from './dtos/update-name-list.dto';
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

  @Put('/vocab')
  removeVocab(@Req() req, @Body() body: DeleteVocabDto) {
    return this.listService.removeVocab(req.user, body);
  }

  @Delete('/:id')
  removeList(@Req() req, @Param('id') id: string) {
    return this.listService.removeList(req.user, id);
  }

  @Put('/vocab-update')
  updateVocab(@Req() req, @Body() body: UpdateVocabDto) {
    return this.listService.updateVocab(req.user, body);
  }

  @Put()
  updateList(@Req() req, @Body() body: UpdateNameList) {
    return this.listService.updateList(req.user, body);
  }

  @Get('my-list')
  getMyList(@Req() req, @Query('search') search: string) {
    return this.listService.getMyList(req.user, search);
  }

  @Get('search-public')
  search(@Query() query: SearchDto) {
    return this.listService.search(query);
  }

  @Get('request_public')
  getRequestPublic() {
    console.log('get request_public');
    return this.listService.findRequestPublic();
  }

  @Get('/:id')
  find(@Req() req, @Param('id') id: string) {
    return this.listService.findById(req.user, id);
  }

  @Patch('star')
  vote(@Req() req, @Body() body: VoteStarDto) {
    return this.listService.voteStar(req.user, body);
  }

  @Post('request_public/:id')
  requestPublic(@Req() req, @Param('id') id: string) {
    return this.listService.requestPublic(req.user, id);
  }

  // @Get('request_public')
  // getRequestPublic() {
  //   return this.listService.findRequestPublic();
  // }

  @RoleG(Role.Manager)
  @Post('handle_request_public')
  handleRequestPublic(@Req() req, @Body() body: HandleRequestPublicDto) {
    return this.listService.handleRequestPublic(
      req.user,
      body.listId,
      body.statement,
    );
  }

  @Post('request_contributor')
  requestContributor(@Req() req, @Body() body: RequestContributorDto) {
    return this.listService.requestContributor(req.user, body.name, body.vocab);
  }

  // @Patch('handle_request_contributor')
  // handleRequestContributor(@Req() req, @Body() body: HandleRequestPublicDto) {
  //   return this.listService.handleRequestContributor(
  //     req.user,
  //     body.name,
  //     body.statement,
  //   );
  // }
}
