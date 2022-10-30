import { CreateUserAdapter } from "./db/adapters/create-user.adapter";
import { CreateUserUseCase } from "./domain/use-cases/create-user.use-case";
import { AuthController } from "./api/controllers/auth.controller";
import { Client } from "pg";

export namespace IOC {
  export function initialize(dbClient: Client) {
    const authController = new AuthController(
      new CreateUserUseCase(new CreateUserAdapter(dbClient))
    );

    return [authController];
  }
}
