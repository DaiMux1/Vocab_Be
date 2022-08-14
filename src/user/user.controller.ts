import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Role } from 'src/constant/role';
import { RoleG } from 'src/guards/role.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('whoami')
  whoami(@Req() req) {
    return req.user;
  }

  @RoleG(Role.SuperAdmin)
  @Patch('/add_manager/:username')
  addManager(@Param('username') username: string) {
    return this.userService.addManager(username);
  }

  @RoleG(Role.SuperAdmin)
  @Patch('ban/:username')
  ban(@Param('username') username: string) {
    return this.userService.ban(username);
  }

  @RoleG(Role.SuperAdmin)
  @Patch('unban/:username')
  unban(@Param('username') username: string) {
    return this.userService.unban(username);
  }

  @Post('/add-favorites-list')
  addFavoriteList(@Req() req, @Body('listId') listId: string) {
    return this.userService.addFavoriteList(req.user, listId);
  }

  @Post('/remove-favorites-list')
  removeFavoriteList(@Req() req, @Body('listId') listId: string) {
    return this.userService.removeFavoriteList(req.user, listId);
  }

  @Get('/my-favorites-list')
  getMyFavoritesList(@Req() req) {
    console.log('my-favorites-list');
    return this.userService.getMyFavoritesList(req.user);
  }
}
