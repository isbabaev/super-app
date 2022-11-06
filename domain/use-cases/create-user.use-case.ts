import { UserEntity } from "../entities/user.entity";
import { UserAlreadyExistException } from "../exceptions/user-already-exist.exception";
import { IParams, ICreateUserPort } from "../ports/in/create-user.port";
import { ICreateUserInStoragePort } from "../ports/out/create-user-in-storage.port";
import { IFindUserByEmailPort } from "../ports/out/find-user-by-email.port";

export class CreateUserUseCase implements ICreateUserPort {
  constructor(
    private readonly createUserInStoragePort: ICreateUserInStoragePort,
    private readonly findUserPort: IFindUserByEmailPort
  ) {}

  async call(params: IParams): Promise<UserEntity> {
    const user = await this.findUserPort.call(params.email);
    if (user) {
      throw new UserAlreadyExistException();
    }

    const id = await this.createUserInStoragePort.call(params);
    return new UserEntity(
      id,
      params.firstName,
      params.lastName,
      params.email,
      params.password
    );
  }
}
