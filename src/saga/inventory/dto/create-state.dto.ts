import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateStateDto {
  @ApiProperty({ type: String, description: 'Name of the state' })
  @IsString()
  @IsNotEmpty()
  name: string
}
