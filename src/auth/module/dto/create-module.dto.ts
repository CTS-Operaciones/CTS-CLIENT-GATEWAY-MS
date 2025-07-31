import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ICreateModule } from '../../../common';

export class CreateModuleDto implements ICreateModule {
  @ApiProperty({ type: String, description: 'Name of the module' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Description of the module',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
