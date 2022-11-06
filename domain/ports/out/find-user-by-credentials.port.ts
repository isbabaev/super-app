import { UserEntity } from "../../entities/user.entity";
import { Email, Password } from "../../value-objects";

export interface IFindUserByCredentialsPort {
  call(params: IParams): Promise<UserEntity | null>;
}

export interface IParams {
  email: Email;
  password: Password;
}