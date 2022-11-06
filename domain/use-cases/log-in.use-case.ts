import { UserNotFoundException } from "../exceptions/user-not-found.exception";
import { ILogInPort, IParams } from "../ports/in/log-in.port";
import { ICreateAuthTokenPort } from "../ports/out/create-auth-token.port";
import { IFindUserByCredentialsPort } from "../ports/out/find-user-by-credentials.port";
import { AuthToken } from "../value-objects/auth-token";

export class LogInUseCase implements ILogInPort {
  constructor(
    private readonly findUserPort: IFindUserByCredentialsPort,
    private readonly createAuthTokenPort: ICreateAuthTokenPort
  ) {}

  async call(params: IParams): Promise<AuthToken> {
    const user = await this.findUserPort.call(params);
    if (!user) {
      throw new UserNotFoundException();
    }

    return this.createAuthTokenPort.call(user.id);
  }
}
