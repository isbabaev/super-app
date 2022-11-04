import { IncomingMessage } from "node:http";
import { ICreateUserPort } from "../../domain/ports/in/create-user.port";
import { Post } from "../decorators/post";
import { ICreateUserBody } from "../interfaces/users.interfaces";
import { parseBody } from "./utils";

export class UsersController {
  constructor(readonly createUserPort: ICreateUserPort) {}

  @Post("/api/users")
  async createUser(request: IncomingMessage) {
    const body = await parseBody<ICreateUserBody>(request);
    
    const user = await this.createUserPort.call(body);

    return { id: user.id.value };
  }
}
