import { UserEntity } from "../../entities/user.entity";
import { FirstName, LastName, Email, Password } from "../../value-objects";

export interface ICreateUserPort {
  call(params: IParams): Promise<UserEntity>;
}

export interface IParams {
  firstName: FirstName;
  lastName: LastName;
  email: Email;
  password: Password;
}
