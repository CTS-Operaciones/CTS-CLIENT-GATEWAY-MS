import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

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
  @Transform(({ obj }) => obj?.relations === 'true')
  relations?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @Transform(({ obj }) => obj?.deletes === 'true')
  deletes?: boolean;
}

export class FindOneDeleteRelationsDto extends OmitType(
  FindOneWhitTermAndRelationDto,
  ['term'] as const,
) {
  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @Transform(({ obj }) => obj?.deletes === 'true')
  deletes?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @Transform(({ obj }) => obj?.relations === 'true')
  relations?: boolean;
}

export class FindOneDto extends OmitType(FindOneWhitTermAndRelationDto, [
  'relations',
  'deletes',
] as const) {
  @ApiProperty({ type: String || Number, required: true })
  @IsString()
  @IsNotEmpty()
  term: string | number;
}

export class FindOneRelationsDto extends OmitType(
  FindOneWhitTermAndRelationDto,
  ['term', 'deletes'] as const,
) {
  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @Transform(({ obj }) => obj?.relations === 'true')
  relations?: boolean;
}

export class FindOneDeleteDto extends OmitType(FindOneWhitTermAndRelationDto, [
  'term',
  'relations',
] as const) {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @Transform(({ obj }) => obj?.deletes === 'true')
  deletes?: boolean;
}
