import { PRESENCE_REASON } from '../constants';

export interface ICreatePresence {
  staff: number;
  date: Date;
}

export interface ICheckInPresence extends ICreatePresence {
  check_in: string;
  reason: PRESENCE_REASON;
}

export interface ICheckOutPresence {
  check_out: string;
}
