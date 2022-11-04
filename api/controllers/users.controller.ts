import { IncomingMessage, ServerResponse } from "node:http";
import { ICreateUserPort } from "../../domain/ports/in/create-user.port";
import { Post } from "../decorators/post";
import { IRegisterBody } from "../interfaces/auth.interfaces";
import { parseBody } from "./utils";

export class UsersController {
  constructor(readonly createUserPort: ICreateUserPort) {}

  @Post("/api/users")
  async createUser(request: IncomingMessage) {
    const body = await parseBody<IRegisterBody>(request);
    
    const user = await this.createUserPort.call(body);

    return { id: user.id.value };
  }
}
