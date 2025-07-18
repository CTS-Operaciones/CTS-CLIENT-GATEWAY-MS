import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  BLOOD_TYPE,
  GENDER,
  NACIONALITY_EMPLOYEE,
  STATUS_CIVIL,
  STATUS_EMPLOYEE,
  IEmployeeCreate,
  IEmergencyContact,
  ToBoolean,
  IAccount,
} from '../../../common/';

class AccountDto implements IAccount {
  @ApiProperty({ type: String, description: 'Email of employee' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the employee required account for the system',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('register')
  register: boolean = false;
}

class EmergencyContactDto implements IEmergencyContact {
  @ApiProperty({
    type: String,
    description: 'Name of emergency contact',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    type: String,
    description: 'Relationship with emergency',
  })
  @IsNotEmpty()
  @IsString()
  relationship: string;

  @ApiProperty({
    type: String,
    description: 'Phone number of emergency',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}

export class CreateEmployeeDto implements IEmployeeCreate {
  @ApiProperty({
    type: Date,
    description: 'Date of registration of employee',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date_register: Date;

  @ApiProperty({
    type: String,
    description: 'Names of employee',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  names: string;

  @ApiProperty({
    type: String,
    description: 'First last name of employee',
  })
  @IsNotEmpty()
  @MaxLength(100)
  first_last_name: string;

  @ApiProperty({
    type: String,
    description: 'Second last name of employee',
  })
  @IsString()
  @MaxLength(100)
  second_last_name?: string;

  @ApiProperty({
    type: String,
    description: 'Date of birth of employee',
  })
  @IsNotEmpty()
  @IsString()
  date_birth: string;

  @ApiProperty({
    type: Number,
    description: 'Age of employee',
    minimum: 18,
  })
  @IsOptional()
  @IsNumber()
  @Min(18)
  year_old: number;

  @ApiProperty({
    type: String,
    description: 'Personal Email of employee',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Telephone number of employee',
    example: '+5212222222222',
  })
  @MaxLength(15)
  @IsString()
  @IsOptional()
  telephone?: string;

  @ApiProperty({
    type: String,
    description: 'Address of employee',
  })
  @MaxLength(200)
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    enum: GENDER,
    description: 'Gender',
  })
  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: GENDER;

  @ApiProperty({
    type: String,
    description: 'CURP',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(18)
  curp: string;

  @ApiProperty({
    type: String,
    description: 'RFC number',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  rfc: string;

  @ApiProperty({
    type: String,
    description: 'Social Security Number',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  nss: string;

  @ApiProperty({
    type: String,
    description: 'INE number',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  ine_number: string;

  @ApiProperty({
    type: String,
    description: 'Alergies',
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  alergy?: string;

  @ApiProperty({
    type: EmergencyContactDto,
    isArray: true,
    description: 'Emergency contact information',
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EmergencyContactDto)
  emergency_contact?: EmergencyContactDto[];

  @ApiProperty({
    enum: NACIONALITY_EMPLOYEE,
    description: 'Nationality employee',
  })
  @IsNotEmpty()
  @IsEnum(NACIONALITY_EMPLOYEE)
  nacionality: NACIONALITY_EMPLOYEE;

  @ApiProperty({
    enum: STATUS_EMPLOYEE,
    description: 'Status employee',
  })
  @IsNotEmpty()
  @IsEnum(STATUS_EMPLOYEE)
  status: STATUS_EMPLOYEE;

  @ApiProperty({
    enum: BLOOD_TYPE,
    description: 'Blood type',
  })
  @IsEnum(BLOOD_TYPE)
  blood_type?: BLOOD_TYPE;

  @ApiProperty({
    enum: STATUS_CIVIL,
    description: 'Status civil',
  })
  @IsEnum(STATUS_CIVIL)
  @IsOptional()
  status_civil?: STATUS_CIVIL;

  @ApiProperty({
    type: String,
    description: 'Number account bank',
  })
  @IsString()
  @MaxLength(20)
  @IsOptional()
  number_account_bank?: string;

  // Relations
  @ApiProperty({
    type: Number,
    description: 'Bank ID',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  bank_id?: number;

  @ApiProperty({
    type: [Number],
    description: 'Array of position IDs',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  position_id: number[];

  @ApiProperty({
    type: Number,
    description: 'Type of contract ID',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Min(1)
  typeContract: number;

  @ApiProperty({
    type: AccountDto,
    description: 'Basic information for account of the system',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AccountDto)
  account: AccountDto;
}
