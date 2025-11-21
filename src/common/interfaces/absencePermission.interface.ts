import {
  ABSENCE_PERMISSION_TYPE,
  STATUS_VACATIONS_PERMISSION,
} from '../constants';

export interface ICreateAbsencePermission {
  staff: number;
  permission_type: ABSENCE_PERMISSION_TYPE;
  start_date: Date;
  end_date: Date;
  time_start?: string;
  time_end?: string;
  required_justified: boolean;
  required_presences: boolean;
  reason: string;
  status?: STATUS_VACATIONS_PERMISSION;
  requested_at: number;
}
