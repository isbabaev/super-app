import { IncomingMessage, ServerResponse } from "node:http";
import { ICreateUserPort } from "../../domain/ports/in/create-user.port";
import { Post } from "../decorators/post";
import { IRegisterBody } from "../interfaces/auth.interfaces";
import { parseBody } from "./utils";

export class AuthController {
  constructor(readonly createUserPort: ICreateUserPort) {}

  @Post("/api/auth/register")
  async register(request: IncomingMessage) {
    const body = await parseBody<IRegisterBody>(request);
    
    const user = await this.createUserPort.call(body);

    return { id: user.id.value };
  }
}
