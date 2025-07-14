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
