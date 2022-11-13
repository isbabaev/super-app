import { IncomingMessage } from "node:http";
import { UserAlreadyExistException } from "../../domain/exceptions/user-already-exist.exception";
import { ICreateUserPort } from "../../domain/ports/in/create-user.port";
import {
  Email,
  FirstName,
  LastName,
  Password,
} from "../../domain/value-objects";
import { Get, Post } from "../decorators";
import { ICreateUserBody } from "../interfaces/users.interfaces";
import { parseBody } from "./utils"
import url from 'url';

export class UsersController {
  constructor(private readonly createUserPort: ICreateUserPort) {}

  @Post("/api/users")
  async createUser(request: IncomingMessage) {
    const body = await parseBody<ICreateUserBody>(request);

    try {
      const user = await this.createUserPort.call({
        firstName: new FirstName(body.firstName),
        lastName: new LastName(body.lastName),
        email: new Email(body.email),
        password: new Password(body.password),
      });

      return { id: user.id.value };
    } catch (error) {
      if (error instanceof UserAlreadyExistException) {
        return { statusCode: 400 };
      }
      throw error;
    }
  }

  @Get("/api/users/:id")
  async getUserById(request: IncomingMessage) {
    const queryObject = url.parse(request.url!, true).query;
    console.log(queryObject);
  }

  // TODO PUT api to change firstName and lastName
}
