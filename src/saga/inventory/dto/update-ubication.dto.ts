import { PartialType } from '@nestjs/swagger';
import { CreateUbicationDto } from './create-ubication.dto';

export class UpdateUbicationDto extends PartialType(CreateUbicationDto) {}
