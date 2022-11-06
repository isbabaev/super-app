import { IncomingMessage } from "node:http";
import { ICreateUserPort } from "../../domain/ports/in/create-user.port";
import { Email, FirstName, LastName, Password } from "../../domain/value-objects";
import { Post } from "../decorators/post";
import { ICreateUserBody } from "../interfaces/users.interfaces";
import { parseBody } from "./utils";

export class UsersController {
  constructor(readonly createUserPort: ICreateUserPort) {}

  @Post("/api/users")
  async createUser(request: IncomingMessage) {
    const body = await parseBody<ICreateUserBody>(request);
    
    const user = await this.createUserPort.call({
      firstName: new FirstName(body.firstName),
      lastName: new LastName(body.lastName),
      email: new Email(body.email),
      password: new Password(body.password),
    });

    return { id: user.id.value };
  }
}
