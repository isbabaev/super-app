import { IncomingMessage, ServerResponse } from "node:http";
import { ICreateUserPort } from "../../domain/ports/in/create-user.port";
import { Post } from "../decorators/post";
import { IRegisterBody } from "../interfaces/auth.interfaces";
import { parseBody } from "./utils";

export class AuthController {
  constructor(readonly createUserPort: ICreateUserPort) {}

  @Post("/api/auth/register")
  async register(request: IncomingMessage, response: ServerResponse) {
    const body = await parseBody<IRegisterBody>(request);
    await this.createUserPort.call(body);

    response.statusCode = 201;
    response.end();
  }
}
