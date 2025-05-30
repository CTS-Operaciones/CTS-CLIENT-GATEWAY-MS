import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeDocumentDto } from './create-typeDocument.dto';

export class UpdateTypeDocumentDto extends PartialType(CreateTypeDocumentDto) {}
