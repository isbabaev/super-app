import { ICreateAuthTokenPort } from "../../domain/ports/out/create-auth-token.port";
import { AuthToken } from "../../domain/value-objects/auth-token";
import { sign } from "jsonwebtoken";
import { Id } from "../../domain/value-objects/id";

export class CreateAuthTokenAdapter implements ICreateAuthTokenPort {
  call(userId: Id): AuthToken {
    const token = sign(userId, process.env.JWT_SECRET!);
    return new AuthToken(token);
  }
}
