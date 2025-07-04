import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty({ type: String, description: 'Name of the resource' })
  @IsString()
  @IsNotEmpty()
  Idname: string;

  @ApiProperty({ type: String, description: 'Serial number of the resource' })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty({ type:Number, description: 'User id' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  user_id: number

  @ApiProperty({ type: Number, description: 'State id' })
  @IsNumber()  
  stateId: number

  @ApiProperty({ type: Number, description: 'Resource id' })
  @IsNumber()
  resourceId: number

  @ApiProperty({ type: Number, description: 'Add resource id' })
  @IsNumber()
  addRemovalId: number

  @ApiProperty({ type: Number, description: 'Ubication id' })
  @IsNumber()
  ubications: number

  @ApiProperty({ type: Number, description: 'Assignment id' })
  @IsNumber()  
  assignmentId: number

  @ApiProperty({ type: Number, description: 'Admissions discharges id' })
  @IsNumber()
  admissionsDischargesId: number

  @ApiProperty({ type: Number, description: 'Habilitation id' })
  @IsNumber()
  habilitationId: number

  @ApiProperty({ type: Number, description: 'Mantenance id' })
  @IsNumber()
  mantenanceId: number



}
