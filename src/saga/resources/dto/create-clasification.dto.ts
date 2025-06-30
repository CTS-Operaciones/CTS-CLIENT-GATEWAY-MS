import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateClasificationDto {
  @ApiProperty({ type: String, description: 'Name of the clasification' })
  @IsString()
  @IsNotEmpty()
name: string
}
