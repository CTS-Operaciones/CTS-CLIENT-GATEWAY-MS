import { PartialType } from '@nestjs/swagger';
import { CreateAdmissionsDischargeDto } from './create-admissions-discharge.dto';

export class UpdateAdmissionsDischargeDto extends PartialType(
  CreateAdmissionsDischargeDto,
) {}
