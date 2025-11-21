import { STATUS_VACATIONS_PERMISSION } from '../constants';

export interface ICreateVacation {
  staff: number;
  dateRange: IDatesRange[];
  requested_day: number;
  status: STATUS_VACATIONS_PERMISSION;
  reason?: string;
  comment?: string;
}

export interface IDatesRange {
  start: Date;
  end: Date;
}


