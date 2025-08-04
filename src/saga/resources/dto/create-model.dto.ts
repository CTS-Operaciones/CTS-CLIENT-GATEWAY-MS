import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateModelDto {

  @ApiProperty({ type: String, description: 'Name of the model' })
  @IsString()
  @IsNotEmpty()
  name: string;
@ApiProperty({ type: Number, description: 'Brand id of the model' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  brandId: number
}
