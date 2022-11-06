import { UserEntity } from "../../entities/user.entity";
import { Email } from "../../value-objects";

export interface IFindUserByEmailPort {
  call(email: Email): Promise<UserEntity | null>;
}