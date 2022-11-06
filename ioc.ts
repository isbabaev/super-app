import { CreateUserAdapter } from "./db/adapters/create-user.adapter";
import { CreateUserUseCase } from "./domain/use-cases/create-user.use-case";
import { UsersController } from "./api/controllers/users.controller";
import { Client } from "pg";
import { AuthController } from "./api/controllers/auth.controller";
import { LogInUseCase } from "./domain/use-cases/log-in.use-case";
import { FindUserByCredentialsAdapter } from "./db/adapters/find-user-by-credentials.adapter";
import { CreateAuthTokenAdapter } from "./auth-tokens/adapters/create-auth-toke.adapter";
import { FindUserByEmailAdapter } from "./db/adapters/find-user-by-email.adapter";

export namespace IOC {
  export function initialize(dbClient: Client) {
    const usersController = new UsersController(
      new CreateUserUseCase(
        new CreateUserAdapter(dbClient),
        new FindUserByEmailAdapter(dbClient)
      ),
    );

    const authController = new AuthController(
      new LogInUseCase(
        new FindUserByCredentialsAdapter(dbClient),
        new CreateAuthTokenAdapter()
      )
    );

    return [usersController, authController];
  }
}
