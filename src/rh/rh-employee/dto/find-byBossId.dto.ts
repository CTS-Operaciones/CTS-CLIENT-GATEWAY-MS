import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class FindByBossIdDto {
  @ApiProperty({ description: 'Id of boss' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  boss_id: number;
}
