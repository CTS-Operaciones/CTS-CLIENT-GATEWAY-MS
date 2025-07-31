export interface ICreateUser {
  email: number;
}

export interface IAddPermission {
  profile: number;
  role: number;
}

export interface IRole {
  type: string;
}
