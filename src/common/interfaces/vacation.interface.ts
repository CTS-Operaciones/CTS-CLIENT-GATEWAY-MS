import { STATUS_VACATIONS_PERMISSION } from '../constants';

export interface ICreateVacation {
  employee: number;
  startDate: Date;
  endDate: Date;
  requested_day: number;
  status: STATUS_VACATIONS_PERMISSION;
  reason?: string;
  comment?: string;
}
