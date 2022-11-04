import { AuthToken } from "../../value-objects/auth-token";
import { Id } from "../../value-objects/id";

export interface ICreateAuthTokenPort {
  call(userId: Id): AuthToken;
}