import { Lang } from '../../entities/user.lang';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserProfileUpdateDto {
  @IsOptional()
  @ApiProperty()
  lang?: Lang;
  @ApiProperty()
  @IsOptional()
  svp?: string;
}
