import { Controller, Get, Param, Patch, Req } from '@nestjs/common';
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
    return this.userService.addManager(username)
  }

  @RoleG(Role.SuperAdmin) 
  @Patch('ban/:username')
  ban(@Param('username') username: string) {
    return this.userService.ban(username)
  }

  @RoleG(Role.SuperAdmin) 
  @Patch('unban/:username')
  unban(@Param('username') username: string) {
    return this.userService.unban(username)
  }
}
