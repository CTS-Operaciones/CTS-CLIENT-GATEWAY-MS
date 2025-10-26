import { MODULES_ENUM, PERMISSIONS_ENUM } from '../constants/auth.enum';

export interface ICreateProfile {
  name: string;
  saved: boolean;
  extends: boolean;
  permissions: IAddModuleToProfile[];
}

export interface IAddModuleToProfile {
  permission: number[];
  module: number;
}

export interface IResponseEnumPermissions {
  permission: PERMISSIONS_ENUM[];
  module: MODULES_ENUM[];
}
