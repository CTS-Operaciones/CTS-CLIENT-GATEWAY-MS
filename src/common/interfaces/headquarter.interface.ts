import { STATUS_PROJECT } from '../constants';

export interface IHeadquarter {
  name: string;
  address: string;
  city: string;
  postal_code: number;
  phone: string;
  production_days: number;
  number_expedients?: number;
  number_images: number;
  sum_expedients: number;
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
  number_expedients?: number;
  number_images: number;
  sum_expedients: number;
  sum_productions: number;
  start_date: Date;
  end_date: Date;
  status: STATUS_PROJECT;
  project: number;
  contact_organization: IContactOrganization;
}

export interface IContactOrganization {
  name: string;
  position: string;
  phone?: string;
  email?: string;
}

export interface IQuotaEmployeePosition {
  max_employee: number;
  position_id: number;
  headquarters?: number;
}
