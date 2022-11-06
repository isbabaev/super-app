import { IncomingMessage } from "node:http";
import { UserNotFoundException } from "../../domain/exceptions/user-not-found.exception";
import { ILogInPort } from "../../domain/ports/in/log-in.port";
import { Email, Password } from "../../domain/value-objects";
import { Post } from "../decorators/post";
import { ILogInBody } from "../interfaces/auth.interfaces";
import { parseBody } from "./utils";

export class AuthController {
  constructor(private readonly logInPort: ILogInPort) {}

  @Post("/api/auth/log-in")
  async logIn(request: IncomingMessage) {
    const body = await parseBody<ILogInBody>(request);

    try {
      const token = await this.logInPort.call({
        email: new Email(body.email),
        password: new Password(body.password),
      });

      return { token: token.value };
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return { statusCode: 404 };
      }
      throw error;
    }
  }
}
