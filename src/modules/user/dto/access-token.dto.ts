import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty()
  readonly accessToken: string;
  @ApiProperty()
  readonly timestamp: Date;

  constructor(accessToken: string, timestamp: Date) {
    this.accessToken = accessToken;
    this.timestamp = timestamp;
  }
}
