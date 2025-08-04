import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty } from 'class-validator';
export class CreateBrandDto { 
 @ApiProperty({ type: String, description: 'Name of the brand' })
  @IsString()
  @IsNotEmpty()
  name: string
}
