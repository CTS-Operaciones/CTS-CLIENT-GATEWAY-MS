import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { IRole } from '../../../common';

export class CreateRoleDto implements IRole {
  @ApiProperty({
    type: String,
    description: 'Type of the role',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
}
