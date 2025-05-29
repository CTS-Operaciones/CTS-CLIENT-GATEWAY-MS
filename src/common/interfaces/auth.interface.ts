export interface ILogin {
  username: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  rol: string;
}
