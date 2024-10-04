
import { UserService } from './user.service';
import {ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
