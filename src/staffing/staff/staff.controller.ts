import { promises as fs } from 'fs';
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

import {
  Auth,
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
} from './dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Staff 👩‍💼👨‍💼')
@Controller({ path: 'staff', version: '1' })
export class StaffController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Auth('STAFF', 'CREAR')
  @Post()
  async create(@Body() createStaffDto: CreateStaffDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.create',
      createStaffDto,
    );
  }

  @Auth('STAFF', 'VER')
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

  @Auth('STAFF', 'CREAR')
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

  @Auth('STAFF', 'VER')
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

  @Auth('STAFF', 'VER')
  @Get('headquarter/finalized/:id')
  async findStaffHeadquarterFinalized(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findStaffHeadquarterFinalized',
      { id },
    );
  }

  @Auth('STAFF', 'VER')
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

  @Auth('STAFF', 'VER')
  @Get('boss/staff')
  async findAllBossStaff(@Query() params: FindBossForStaffDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findBossForStaff',
      params,
    );
  }

  @Auth('STAFF', 'EDITAR')
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

  @Auth('STAFF', 'VER')
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
