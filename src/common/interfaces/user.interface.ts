export interface IUser { 
  username: string;
  email: string;
  password: string;
  role: IRole;
}

export interface ICreateUser extends Omit<IUser, 'role'> { 
  role_id: number;
}

export interface IRole { 
  type: string;
}