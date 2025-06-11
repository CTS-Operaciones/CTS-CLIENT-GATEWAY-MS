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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { CreateDocumentDto, UpdateDocumentDto } from './dto';

import {
  ErrorManager,
  FindOneWhitTermAndRelationDto,
  ICreateDocument,
  IFileSend,
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

import { fileFilter, storage } from './helpers';
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

  @Get()
  async findAll(@Query() pagination: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'findAllDocument',
      pagination,
    );
  }

  @Get(':term')
  async findOne(
    @Param('term', ParseIntPipe) id: number,
    @Query() relations: FindOneWhitTermAndRelationDto,
  ) {
    const findOneWhitTermAndRelationDto = {
      ...relations,
      term: id,
    };

    return await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'findOneDocument',
      findOneWhitTermAndRelationDto,
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRhDocumentDto: UpdateDocumentDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'updateDocument',
      { id, ...updateRhDocumentDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'removeDocument',
      { id },
    );
  }
}
