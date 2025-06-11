import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ParseAndValidatePipe implements PipeTransform {
  constructor(private readonly dtoClass: any) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (typeof value.data === 'string') {
        value.data = JSON.parse(value.data);
      }

      if (typeof value.employee === 'string') {
        value.employee = parseInt(value.employee, 10);
      }

      const object = plainToInstance(this.dtoClass, value);
      const errors = await validate(object, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

      return object;
    } catch (error) {
      throw new BadRequestException(
        error instanceof SyntaxError ? 'Invalid JSON in `data`' : error,
      );
    }
  }
}
