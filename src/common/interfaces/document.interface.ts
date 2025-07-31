import { UpdateResult } from 'typeorm';
import { IEmployee } from './employee.interface';

export interface IDocument {
  url_file: string;
  size?: number;
  name: string;
  type: ITypeDocument;
  employee: IEmployee;
}

export interface ITypeDocument {
  type: string;
}

export interface ICreateDocument extends Omit<IDocument, 'employee' | 'type'> {
  type: number;
  employee: number;
}

export interface ISendDocument {
  employee: number;
  data: IFileSend[];
}

export interface IUpdateSendDocument {
  data: IFileSend;
  employee: number;
}

export interface IUpdateDocumentMSDto extends ICreateDocument {
  id: number;
}

export interface IFileSend {
  type: number;
  file: string;
}

export interface IResponseUpdateDocument {
  result: UpdateResult;
  old_file: string;
}
