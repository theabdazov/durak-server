
import { UserService } from './user.service';
import {ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
