import { Response } from 'express';
import { resolve } from 'path';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Inject,
  UseInterceptors,
  UploadedFiles,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

import { CreateDocumentDto, UpdateDocumentDto } from './dto';

import {
  ErrorManager,
  FindOneDto,
  ICreateDocument,
  IDocument,
  IFileSend,
  IResponseUpdateDocument,
  IUpdateDocumentMSDto,
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

import { fileFilter, removeFile, storage } from './helpers';
import { ParseAndValidatePipe } from './pipes';
import { CleanupFilesInterceptor } from './interceptor';

@ApiTags('Documents ❌')
@Controller({ path: 'document', version: '1' })
export class RhDocumentController {
  constructor(
    @Inject(NATS_SERVICE) private readonly documentClient: ClientProxy,
  ) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({ fileFilter, storage }),
    CleanupFilesInterceptor,
  )
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body(new ParseAndValidatePipe(CreateDocumentDto)) body: any,
  ) {
    try {
      const { data, employee } = body;

      const fileData: ICreateDocument[] = [];

      files.forEach((file) => {
        const index = data.findIndex(
          (el: IFileSend) => el.file == file.fieldname,
        );

        index > -1 &&
          fileData.push({
            ...data[index],
            employee,
            type: data[index].type,
            name: file.filename,
            url_file: file.path,
            size: file.size,
          });
      });

      return await sendAndHandleRpcExceptionPromise(
        this.documentClient,
        'createDocument',
        { files: fileData },
      );
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  @Get(':term')
  async findFilesForEmployee(
    @Param() findOneDto: FindOneDto,
    @Res() res: Response,
  ) {
    const { url_file }: IDocument = await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'findOneDocument',
      findOneDto,
    );

    if (url_file && url_file.length > 0) {
      const absolutePath = resolve(url_file);

      res.setHeader('Content-Type', 'application/pdf');
      res.sendFile(absolutePath);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  }

  @Get('employee/:id')
  async findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() pagination: PaginationRelationsDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'findAllDocument',
      { employee_id: id, ...pagination },
    );
  }

  // TODO: Verificar el borrado de documentos si existe un error.
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', { fileFilter, storage }),
    CleanupFilesInterceptor,
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body(new ParseAndValidatePipe(UpdateDocumentDto)) body: any,
  ) {
    try {
      const fileData: ICreateDocument = {
        ...body.data,
        name: file.filename,
        url_file: file.path,
        size: file.size,
        employee: body.employee,
      };

      const { result, old_file }: IResponseUpdateDocument =
        await sendAndHandleRpcExceptionPromise(
          this.documentClient,
          'updateDocument',
          {
            id,
            name: fileData.name,
            url_file: fileData.url_file,
            size: fileData.size,
            type: fileData.type,
            employee: fileData.employee,
          } as IUpdateDocumentMSDto,
        );

      removeFile(old_file);

      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  // TODO: Borrado de documentos en el disco.
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'removeDocument',
      { id },
    );
  }
}
