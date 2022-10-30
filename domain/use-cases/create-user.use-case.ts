import { UserEntity } from "../entities/user.entity";
import { IParams, ICreateUserPort } from "../ports/in/create-user.port";
import { ICreateUserInStoragePort } from "../ports/out/create-user-in-storage.port";

export class CreateUserUseCase implements ICreateUserPort {
  constructor(private readonly CreateUserInStorage: ICreateUserInStoragePort) {}

  async call(params: IParams): Promise<UserEntity> {
    const id = await this.CreateUserInStorage.call(params);
    return new UserEntity(
      id,
      params.firstName,
      params.lastName,
      params.email,
      params.password
    );
  }
}
