import { UserEntity } from "../../entities/user.entity";

export interface ICreateUserPort {
  call(params: IParams): Promise<UserEntity>;
}

export interface IParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
