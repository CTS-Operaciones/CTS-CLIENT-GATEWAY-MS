import { STATUS_PROJECT } from '../constants';
import { IHeadquarter } from './headquarter.interface';

export interface IProject {
  contract_number: string;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  number_expedients: number;
  number_images: number;
  productions_days: number;
  sum_productions: number;
  status: STATUS_PROJECT;
  // TODO: Relaciones
  headquarters: IHeadquarter[];
}

export interface ICreateProject {
  contract_number: string;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  number_expedients: number;
  productions_days: number;
  sum_productions: number;
}
