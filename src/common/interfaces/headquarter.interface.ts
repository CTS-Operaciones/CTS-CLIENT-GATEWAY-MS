import { STATUS_PROJECT } from '../constants';

export interface IHeadquiarter {
  name: string;
  address: string;
  city: string;
  postal_code: number;
  phone: string;
  production_days: number;
  number_expedients: number;
  sum_productions: number;
  status: STATUS_PROJECT;
}

export interface ICreateHeadquarter {
  name: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  production_days: number;
  number_expedients: number;
  sum_productions: number;
  status: STATUS_PROJECT;
  project: number;
}
