import { Body, Controller, Delete, Post, Put, Req } from '@nestjs/common';
import { CreateListDto } from './dtos/create-list.dto';
import { DeleteVocabDto } from './dtos/delete-vocab.dto';
import { UpdateVocabDto } from './dtos/update-vocab.dto';
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
  removeVocab(@Req() req, @Body() body: DeleteVocabDto) {
    return this.listService.removeVocab(req.user, body)
  }

  @Put()
  updateVocab(@Req() req, @Body() body: UpdateVocabDto) {
    return this.listService.updateVocab(req.user, body)
  }
}
