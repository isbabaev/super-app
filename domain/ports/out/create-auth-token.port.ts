import { Id, AuthToken } from "../../value-objects";

export interface ICreateAuthTokenPort {
  call(userId: Id): AuthToken;
}
