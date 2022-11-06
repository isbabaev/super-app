import { Id, FirstName, LastName, Email, Password } from "../../value-objects";

export interface ICreateUserInStoragePort {
  call(params: IParams): Promise<Id>;
}

export interface IParams {
  firstName: FirstName;
  lastName: LastName;
  email: Email;
  password: Password;
}
