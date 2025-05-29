import { IsNotEmpty, IsString } from 'class-validator';
import { IRole } from '../../../common';

export class CreateRoleDto implements IRole {
  @IsString()
  @IsNotEmpty()
  type: string;
}
