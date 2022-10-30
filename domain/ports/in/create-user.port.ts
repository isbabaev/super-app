import { Id } from "../../value-objects/id";

export interface ICreateUserPort {
  call(params: ICreateUser): Promise<Id>;
}

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
