import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import {
  FindOneRelationsDto,
  IProject,
  NATS_SERVICE,
  PaginationDto,
  PaginationFilterProjectStatusDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

import { CreateProjectDto } from './dto/create-project.dto';
import {
  UpdateProjectDto,
  UpdateProjectStatus,
} from './dto/update-project.dto';

@ApiTags('Projects ✅')
@Controller({ path: 'projects', version: '1' })
export class ProjectsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProjects: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProjects,
      'createProject',
      createProjectDto,
    );
  }

  @Get()
  async findAll(
    @Query() pagination: PaginationFilterProjectStatusDto<IProject>,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProjects,
      'findAllProjects',
      pagination,
    );
  }

  @Get(':term')
  async findOne(
    @Param('term') term: string,
    @Query() { relations }: FindOneRelationsDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProjects,
      'findOneProject',
      { term, relations },
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProjects,
      'updateProject',
      { id, ...updateProjectDto },
    );
  }

  @Patch(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProjects,
      'removeProject',
      { id },
    );
  }

  @Patch('status-change/:id')
  async changeStatus(
    @Param('id') id: number,
    @Body() updateProjectStatus: UpdateProjectStatus,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProjects,
      'changeStatusProject',
      { id, ...updateProjectStatus },
    );
  }
}
