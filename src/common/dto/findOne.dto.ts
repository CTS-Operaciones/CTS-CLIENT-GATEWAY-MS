import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IFindOne } from '../interfaces';

export class FindOneWhitTermAndRelationDto implements IFindOne {
  @ApiProperty({ type: String || Number, required: true })
  @IsString()
  @IsNotEmpty()
  term: string | number;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  relations?: boolean;
}

export class FindOneDto extends OmitType(FindOneWhitTermAndRelationDto, [
  'relations',
] as const) {
  @ApiProperty({ type: String || Number, required: true })
  @IsString()
  @IsNotEmpty()
  term: string | number;
}

export class FindOneRelationsDto extends OmitType(
  FindOneWhitTermAndRelationDto,
  ['term'] as const,
) {
  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  relations?: boolean;
}
