import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

import { parseLocalDate } from '../../common';

export enum GroupByPeriod {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export class FilterDashboardDto {
  @ApiProperty({ type: Date, required: false })
  @IsDate()
  @IsOptional()
  @Transform(parseLocalDate)
  startDate?: Date;

  @ApiProperty({ type: Date, required: false })
  @IsDate()
  @IsOptional()
  @Transform(parseLocalDate)
  endDate?: Date;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isDismissal?: boolean;

  @ApiProperty({ type: Number, required: false, description: 'ID de la sede' })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  headquarterId?: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'ID del proyecto',
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  projectId?: number;

  @ApiProperty({ type: Number, required: false, description: 'ID del puesto' })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  positionId?: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'ID del departamento',
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Incluir listado de empleados con detalles',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  includeEmployeesList?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Filtrar empleados que tienen bonos asignados',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  hasBonds?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Filtrar empleados con bonos activos (no vencidos)',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  hasActiveBonds?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Filtrar empleados con bonos vencidos en el rango de fechas',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  hasExpiredBonds?: boolean;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'ID del tipo de bono',
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  bondTypeId?: number;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Mostrar solo vacaciones pendientes de aprobación',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  showPendingVacations?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Mostrar solo permisos pendientes de aprobación',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  showPendingPermissions?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Incluir datos para gráficas agrupados por período',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  includeChartData?: boolean;

  @ApiProperty({
    enum: GroupByPeriod,
    required: false,
    description: 'Agrupar datos por: DAY, WEEK, MONTH, YEAR',
  })
  @IsEnum(GroupByPeriod)
  @IsOptional()
  groupBy?: GroupByPeriod;
}

export class FilterDashboardStaffProductionChartDto {
  @ApiProperty({
    enum: GroupByPeriod,
    required: false,
    description: 'Agrupar datos por: DAY, WEEK, MONTH, YEAR',
  })
  @IsEnum(GroupByPeriod)
  @IsOptional()
  groupBy?: GroupByPeriod = GroupByPeriod.DAY;
}
