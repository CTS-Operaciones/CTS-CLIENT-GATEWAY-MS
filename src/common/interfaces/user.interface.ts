export interface IUser { 
  username: string;
  email: string;
  password: string;
  role: IRole;
}

export interface ICreateUser extends Omit<IUser, 'role'> {
  role: number;
  modules: IModuleForUser[];
}

export interface IModuleForUser {
  module: number;
  permissions: number[];
}


export interface IRole { 
  type: string;
}