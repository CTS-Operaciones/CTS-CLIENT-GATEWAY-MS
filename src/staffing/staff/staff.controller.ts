import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { promises as fs } from 'fs';

import {
  CleanupFilesInterceptor,
  fileFilter,
  NATS_SERVICE,
  sendAndHandleRpcExceptionPromise,
  storage,
} from '../../common';

import {
  CreateStaffDto,
  FindBossForStaffDto,
  FindStaffForProductionReportDto,
  FindStaffInHeadquarterDto,
  FindStaffInProjectDto,
  ManageStaffFinalizationDto,
  UpdateStaffDto,
  UploadedProductionFileDto,
  UploadProductionReportDto,
} from './dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Staff 👩‍💼👨‍💼')
@Controller({ path: 'staff', version: '1' })
export class StaffController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createStaffDto: CreateStaffDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.create',
      createStaffDto,
    );
  }

  @Post('production-report')
  @UseInterceptors(
    AnyFilesInterceptor({ fileFilter, storage }),
    CleanupFilesInterceptor,
  )
  async uploadProductionReport(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    const [file] = Array.isArray(files) ? files : [];

    if (!file) {
      throw new BadRequestException('El archivo XLSX es requerido');
    }

    const fileBuffer = await fs.readFile(file.path);

    const fileData: UploadedProductionFileDto = {
      originalname: file.originalname,
      mimetype: file.mimetype,
      buffer: fileBuffer.toString('base64'),
      encoding: file.encoding,
    };

    await fs.unlink(file.path).catch(() => undefined);

    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.uploadProductionReport',
      { file: fileData, ...body },
    );
  }

  @Post('manage/finalization')
  async manageStaffFinalization(
    @Body() manageStaffFinalizationDto: ManageStaffFinalizationDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.manageStaffFinalization',
      manageStaffFinalizationDto,
    );
  }

  @Get('project/:id')
  async findAllEmployeeInProject(
    @Param('id', ParseIntPipe) id: number,
    @Query() filters: FindStaffInProjectDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findAll.project',
      { id, filters },
    );
  }

  @Get('headquarter/finalized/:id')
  async findStaffHeadquarterFinalized(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findStaffHeadquarterFinalized',
      { id },
    );
  }

  @Get('headquarter/:id')
  async findAllEmployeeInHeadquarter(
    @Param('id', ParseIntPipe) id: number,
    @Query() filters: FindStaffInHeadquarterDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findAll.headquarter',
      { id, filters },
    );
  }

  @Get('boss/staff')
  async findAllBossStaff(@Query() params: FindBossForStaffDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findBossForStaff',
      params,
    );
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return sendAndHandleRpcExceptionPromise(this.clientProxy, 'staff.update', {
      id,
      ...updateStaffDto,
    });
  }

  @Get('production-report/:headquarter_id')
  async findStaffForProductionReport(
    @Query() params: FindStaffForProductionReportDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findStaffForProductionReport',
      params,
    );
  }
}
