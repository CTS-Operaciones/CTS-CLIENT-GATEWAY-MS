import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto, EmploymentRecordDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(
  OmitType(CreateEmployeeDto, ['contract', 'status'] as const),
) {}

export class UpdateEmployeeContractDto extends PartialType(
  EmploymentRecordDto,
) {}
