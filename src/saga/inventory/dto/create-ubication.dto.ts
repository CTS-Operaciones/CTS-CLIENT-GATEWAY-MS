import { IsNotEmpty,IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateUbicationDto {
  @ApiProperty({ type: String, description: 'Ubication of the resource' })
  @IsString()
  @IsNotEmpty()
  ubications: string;



}
