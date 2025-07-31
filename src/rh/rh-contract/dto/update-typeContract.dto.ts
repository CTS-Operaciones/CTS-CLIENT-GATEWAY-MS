import { PartialType } from '@nestjs/swagger';

import { CreateTypeContractDto } from './create-typeContract.dto';

export class UpdateTypeContractDto extends PartialType(CreateTypeContractDto) {}
