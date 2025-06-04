import { STATUS_PROJECT } from '../constants';
import { IHeadquiarter } from './headquarter.interface';

export interface IProject {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  number_expedients: number;
  productions_days: number;
  sum_productions: number;
  status: STATUS_PROJECT;
  // TODO: Relaciones
  headquarters: IHeadquiarter[];
}

export interface ICreateProject {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  number_expedients: number;
  productions_days: number;
  sum_productions: number;
}
