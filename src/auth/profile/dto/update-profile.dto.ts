import { PartialType, OmitType } from '@nestjs/swagger';

import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(
  OmitType(CreateProfileDto, ['id', 'extends'] as const),
) {}
