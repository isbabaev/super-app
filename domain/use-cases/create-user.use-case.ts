import { UserEntity } from "../entities/user.entity";
import { ICreateUserInStoragePort } from "../ports/create-user-in-storage.port";

export class CreateUserUseCase {
  constructor(private readonly CreateUserInStorage: ICreateUserInStoragePort) {}

  async call(login: string, password: string) {
    const user = new UserEntity(login, password);
    await this.CreateUserInStorage.call(user);
  }
}
