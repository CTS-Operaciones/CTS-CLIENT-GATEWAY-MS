import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IContactOrganization, ICreateProject } from '../../../common';

export class ContactOrganizationDto implements IContactOrganization {
  @ApiProperty({ type: String, description: 'Name of the contact' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: 'Position of the contact' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Email of the contact',
  })
  @IsEmail()
  @IsOptional()
  email?: string = '';

  @ApiProperty({
    type: String,
    required: false,
    description: 'Phone number of the contact',
  })
  @IsString()
  @IsPhoneNumber('MX')
  @IsOptional()
  phone?: string = '';
}

export class CreateProjectDto implements ICreateProject {
  @ApiProperty({ type: String, description: 'Contract number of the project' })
  @IsString()
  @IsNotEmpty()
  contract_number: string;

  @ApiProperty({ type: String, description: 'Name of the project' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: 'Description of the project' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Date, description: 'Start date of the project' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({ type: Date, description: 'End date of the project' })
  @IsDate()
  @IsNotEmpty()
  end_date: Date;

  @ApiProperty({ type: Number, description: 'Number of images' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  number_images: number;

  @ApiProperty({
    type: Number,
    description: 'Number of expedients',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  number_expedients: number;

  @ApiProperty({ type: Number, description: 'Number of productions days' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  productions_days: number;

  @ApiProperty({ type: Number, description: 'Sum of productions' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  sum_productions: number;

  @ApiProperty({
    type: ContactOrganizationDto,
    required: false,
    description: 'Contact organization details',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactOrganizationDto)
  contact_organization?: ContactOrganizationDto;
}
