export interface ILogin {
  username: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  rol: string;
}

export interface IChangePassword extends Omit<ILogin, 'username'> {
  password: string;
}