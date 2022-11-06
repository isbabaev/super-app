import { UserEntity } from "../../entities/user.entity";

export interface IFindUserByCredentialsPort {
  call(params: IParams): Promise<UserEntity | null>;
}

export interface IParams {
  email: string;
  password: string;
}