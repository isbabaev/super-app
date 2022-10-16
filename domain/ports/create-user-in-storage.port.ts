import { UserEntity } from "../entities/user.entity";

export interface ICreateUserInStoragePort {
  call(user: UserEntity): Promise<void>;
}