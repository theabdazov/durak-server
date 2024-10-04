import { UserEntity } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fullName: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.fullName = user.fullName
  }
}

export const UserDtoMapper = (user: UserEntity) => new UserDto(user);
