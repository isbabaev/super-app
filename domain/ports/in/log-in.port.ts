import { AuthToken } from "../../value-objects/auth-token";

export interface ILogInPort {
  call(params: IParams): Promise<AuthToken | null>;
}

export interface IParams {
  email: string;
  password: string;
}
