import { IProject } from './project.interface';

export interface IExtension {
  number_expedients: number;
  start_date: Date;
  end_date: Date;
  // TODO: Relations
  project: IProject;
}

export interface ICreateExtension {
  number_expedients: number;
  start_date: Date;
  end_date: Date;
  project_id: number;
}
