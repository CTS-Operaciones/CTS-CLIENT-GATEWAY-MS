import { IsNotEmpty, IsString } from 'class-validator';

export class TokenValidateDto { 
  @IsString()
  @IsNotEmpty()
  token: string;
}