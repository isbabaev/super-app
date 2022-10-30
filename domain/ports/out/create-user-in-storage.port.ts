import { UserEntity } from "../../entities/user.entity";
import { Id } from "../../value-objects/id";

export interface ICreateUserInStoragePort {
  call(user: UserEntity): Promise<Id>;
}