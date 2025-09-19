import { PartialType } from '@nestjs/swagger';
import { CreateHabilitationDto } from './create-habilitation.dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateHabilitationDto extends PartialType(CreateHabilitationDto) {

}
