import { ApiProperty } from '@nestjs/swagger';

export class CreateGameInviterDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  userId?: string;
}
