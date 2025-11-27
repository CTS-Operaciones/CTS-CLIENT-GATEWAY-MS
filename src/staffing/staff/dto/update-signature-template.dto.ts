import { PartialType } from '@nestjs/mapped-types';
import { CreateSignatureTemplateDto } from './create-signature-template.dto';

export class UpdateSignatureTemplateDto extends PartialType(
  CreateSignatureTemplateDto,
) {
}

