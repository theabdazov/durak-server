import { User } from '../../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../../entities/user.status';
import { Lang } from '../../entities/user.lang';

export class UserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  status: UserStatus;
  @ApiProperty()
  svp: string;
  @ApiProperty()
  lang: Lang;

  constructor(user: User) {
    this.id = user.id;
    this.phone = user.phone;
    this.status = user.status;
    this.svp = user.svp;
    this.lang = user.lang;
  }
}

export const UserDtoMapper = (user: User) => new UserDto(user);
