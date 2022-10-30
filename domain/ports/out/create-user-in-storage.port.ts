import { Id } from "../../value-objects/id";

export interface ICreateUserInStoragePort {
  call(params: IParams): Promise<Id>;
}

export interface IParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}