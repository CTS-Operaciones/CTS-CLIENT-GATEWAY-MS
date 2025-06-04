import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { CreateProjectDto } from './create-project.dto';
import { STATUS_PROJECT } from '../../../common';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export class UpdateProjectStatus {
  @ApiProperty({ enum: STATUS_PROJECT, description: 'Status of the project' })
  @IsNotEmpty()
  @IsEnum(STATUS_PROJECT)
  status: STATUS_PROJECT;
}
