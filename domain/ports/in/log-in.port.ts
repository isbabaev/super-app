import { AuthToken } from "../../value-objects/auth-token";
import { Email, Password } from "../../value-objects";

export interface ILogInPort {
  call(params: IParams): Promise<AuthToken>;
}

export interface IParams {
  email: Email;
  password: Password;
}
