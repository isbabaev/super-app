import { AuthToken } from "../../value-objects/auth-token";

export interface ILogInPort {
  call(params: IParams): Promise<AuthToken>;
}

export interface IParams {
  email: string;
  password: string;
}
