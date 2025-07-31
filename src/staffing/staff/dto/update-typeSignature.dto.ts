import { PartialType } from '@nestjs/swagger';
import { CreateTypeSignatureDto } from './create-typeSignature.dto';

export class UpdateTypeSignatureDto extends PartialType(
  CreateTypeSignatureDto,
) {}
