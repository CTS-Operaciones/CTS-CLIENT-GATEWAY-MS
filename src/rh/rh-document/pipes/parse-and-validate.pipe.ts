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
      for (const key of Object.keys(value)) {
        const val = value[key];
        if (typeof val === 'string') {
          if (
            (val.startsWith('[') && val.endsWith(']')) ||
            (val.startsWith('{') && val.endsWith('}'))
          ) {
            try {
              value[key] = JSON.parse(val);
            } catch (error) {
              throw new BadRequestException(
                `Error parsing JSON payload: ${error}`,
              );
            }
          } else if (!isNaN(+val)) {
            value[key] = parseInt(val, 10);
          }
        }
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
