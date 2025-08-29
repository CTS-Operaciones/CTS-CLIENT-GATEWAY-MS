import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import * as fs from 'fs';
import { envs } from '../configs';

@Injectable()
export class CleanupFilesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (req.files) {
      const files = fs.readdirSync(envs.FOLDER_PDFS).filter((file) => {
        file.split('.').includes('login');
      });
    }

    return next.handle().pipe(
      catchError((err) => {
        const files = req.files;

        if (Array.isArray(files)) {
          files.forEach((file) => this.removeFile(file.path));
        } else if (typeof files === 'object' && files !== null) {
          Object.values(files)
            .flat()
            .forEach((file: Express.Multer.File) => this.removeFile(file.path));
        }

        return throwError(() => err);
      }),
    );
  }

  private removeFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        throwError(() => 'Error deleting file ❌' + err);
      }
    });
  }
}
