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

import {
  Auth,
  NATS_SERVICE,
  sendAndHandleRpcExceptionPromise,
} from '../common';
import {
  FilterDashboardDto,
  FilterDashboardProductionChartDto,
  FilterDashboardStaffProductionChartDto,
} from './dto';

@ApiTags('Dashboard 📊')
@Controller({ path: 'dashboard', version: '1' })
export class DashboardController {
  constructor(
    @Inject(NATS_SERVICE) private readonly dashboardService: ClientProxy,
  ) {}

  @Auth('DASHBOARD_RH', 'VER')
  @Get('rh')
  async getDashboardData(@Query() filterDashboardDto: FilterDashboardDto) {
    return sendAndHandleRpcExceptionPromise(
      this.dashboardService,
      'get-dashboard-data',
      filterDashboardDto,
    );
  }

  @Auth('DASHBOARD_OP', 'VER')
  @Get('op/project/:project')
  async getDashboardDataOp(@Param('project', ParseIntPipe) project: number) {
    return sendAndHandleRpcExceptionPromise(
      this.dashboardService,
      'dashboard.proyect-summary',
      { project },
    );
  }

  @Auth('DASHBOARD_OP', 'VER')
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

  @Auth('DASHBOARD_HEADQUARTER', 'VER')
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

  @Auth('DASHBOARD_HEADQUARTER', 'VER')
  @Get('op/staff/:staff')
  async getDashboardDataOpStaff(@Param('staff', ParseIntPipe) staff: number) {
    return sendAndHandleRpcExceptionPromise(
      this.dashboardService,
      'dashboard.staff-production',
      { staff },
    );
  }

  @Auth('DASHBOARD_HEADQUARTER', 'VER')
  @Get('op/production/chart')
  async getDashboardDataOpProductionChart(
    @Query()
    filterDashboardProductionChartDto: FilterDashboardProductionChartDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.dashboardService,
      'dashboard.production-chart',
      filterDashboardProductionChartDto,
    );
  }

  @Auth('DASHBOARD_HEADQUARTER', 'VER')
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
