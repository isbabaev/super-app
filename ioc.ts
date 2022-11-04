import { CreateUserAdapter } from "./db/adapters/create-user.adapter";
import { CreateUserUseCase } from "./domain/use-cases/create-user.use-case";
import { UsersController } from "./api/controllers/users.controller";
import { Client } from "pg";

export namespace IOC {
  export function initialize(dbClient: Client) {
    const authController = new UsersController(
      new CreateUserUseCase(new CreateUserAdapter(dbClient))
    );

    return [authController];
  }
}
