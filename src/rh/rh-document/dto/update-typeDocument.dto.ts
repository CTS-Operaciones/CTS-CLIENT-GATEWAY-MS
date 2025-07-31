import { PartialType } from '@nestjs/swagger';
import { CreateTypeDocumentDto } from './create-typeDocument.dto';

export class UpdateTypeDocumentDto extends PartialType(CreateTypeDocumentDto) {}
