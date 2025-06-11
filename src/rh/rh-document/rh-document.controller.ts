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
  IFileSend,
  ISendDocument,
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

import { fileFilter, storage } from './helpers';

@ApiTags('Documents ❌')
@Controller({ path: 'document', version: '1' })
export class RhDocumentController {
  constructor(
    @Inject(NATS_SERVICE) private readonly documentClient: ClientProxy,
  ) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor({ fileFilter, storage }))
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: ISendDocument,
  ) {
    try {
      if (body.data === undefined) {
        body.data = JSON.stringify([{}]);
      }

      const fileData: IFileSend[] = JSON.parse(body.data);

      files.forEach((file) => {
        const newFile = fileData.filter((el) => {
          el.file === file.filename;
        });
      });

      //TODO: Modificar el file por el nombre original del archivo subido

      return { files, fileData };
      return await sendAndHandleRpcExceptionPromise(
        this.documentClient,
        'createDocument',
        { fileData },
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
