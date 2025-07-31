import { Type } from 'class-transformer';
import { CreateDocumentDto, FileSendDto } from './create-document.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { IUpdateSendDocument } from '../../../common';

export class UpdateDocumentDto implements IUpdateSendDocument {
  @ApiProperty({
    type: String,
    description: 'Objetive of the document with number type',
  })
  @IsNotEmpty()
  @Type(() => FileSendDto)
  data: FileSendDto;

  @ApiProperty({
    type: Number,
    description: 'Employee id of the document',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  employee: number;
}
