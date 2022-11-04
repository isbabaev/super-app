import { IncomingMessage } from "node:http";
import { ILogInPort } from "../../domain/ports/in/log-in.port";
import { Post } from "../decorators/post";
import { ILogInBody } from "../interfaces/auth.interfaces";
import { parseBody } from "./utils";

export class AuthController {
  constructor(private readonly logInPort: ILogInPort) {}

  @Post("/api/auth/log-in")
  async logIn(request: IncomingMessage) {
    const body = await parseBody<ILogInBody>(request);

    const token = await this.logInPort.call(body);

    return { token: token?.value };
  }
}
