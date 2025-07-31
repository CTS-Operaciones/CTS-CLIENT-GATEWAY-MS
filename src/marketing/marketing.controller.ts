import { resolve } from 'path';
import { Response } from 'express';
import {
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import {
  CleanupFilesInterceptor,
  ICreateImage,
  NATS_SERVICE,
  fileFilter,
  sendAndHandleRpcExceptionPromise,
  storage,
} from '../common';

@ApiTags('Marketing 📲')
@Controller({ path: 'marketing', version: '1' })
export class MarketingController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @UseInterceptors(
    FileInterceptor('file', { fileFilter, storage }),
    CleanupFilesInterceptor,
  )
  @Post('image')
  async addImage(@UploadedFile() file: Express.Multer.File) {
    const data: ICreateImage = {
      mimetype: file.mimetype,
      originalname: file.originalname,
      path: file.path,
      size: file.size,
    };

    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'images.create',
      data,
    );
  }

  @Get('image/:id')
  async findImageById(@Param('id') id: number, @Res() res: Response) {
    const path: { path: string } = await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'images.findOne',
      { id },
    );

    const absolutePath = resolve(path.path);

    return res.sendFile(absolutePath);
  }

  @Patch('image/:id')
  updateImage() {}
}
