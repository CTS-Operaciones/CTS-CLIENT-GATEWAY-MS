import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from '../common';
import {
  FilterDashboardDto,
  FilterDashboardStaffProductionChartDto,
} from './dto';

@ApiTags('Dashboard 📊')
@Controller({ path: 'dashboard', version: '1' })
export class DashboardController {
  constructor(
    @Inject(NATS_SERVICE) private readonly dashboardService: ClientProxy,
  ) {}

  @Get('rh')
  async getDashboardData(@Query() filterDashboardDto: FilterDashboardDto) {
    return sendAndHandleRpcExceptionPromise(
      this.dashboardService,
      'get-dashboard-data',
      filterDashboardDto,
    );
  }

  @Get('op/project/:project')
  async getDashboardDataOp(@Param('project', ParseIntPipe) project: number) {
    return sendAndHandleRpcExceptionPromise(
      this.dashboardService,
      'dashboard.proyect-summary',
      { project },
    );
  }

  @Get('op/project/:project/progress')
  async getDashboardDataOpProgress(
    @Param('project', ParseIntPipe) project: number,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.dashboardService,
      'dashboard.proyect-progress-summary',
      { projectId: project },
    );
  }

  @Get('op/headquarter/:headquarter')
  async getDashboardDataOpHeadquarter(
    @Param('headquarter', ParseIntPipe) headquarter: number,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.dashboardService,
      'dashboard.headquarter-summary',
      { headquarter },
    );
  }

  @Get('op/staff/:staff')
  async getDashboardDataOpStaff(@Param('staff', ParseIntPipe) staff: number) {
    return sendAndHandleRpcExceptionPromise(
      this.dashboardService,
      'dashboard.staff-production',
      { staff },
    );
  }

  @Get('op/staff/chart/:staff')
  async getDashboardDataOpStaffChart(
    @Param('staff', ParseIntPipe) staff: number,
    @Query() filters: FilterDashboardStaffProductionChartDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.dashboardService,
      'dashboard.staff-production-chart',
      { staffId: staff, ...filters },
    );
  }
}
