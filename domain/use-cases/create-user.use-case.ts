import { UserEntity } from "../entities/user.entity";
import { ICreateUser, ICreateUserPort } from "../ports/in/create-user.port";
import { ICreateUserInStoragePort } from "../ports/out/create-user-in-storage.port";

export class CreateUserUseCase implements ICreateUserPort {
  constructor(private readonly CreateUserInStorage: ICreateUserInStoragePort) {}

  async call(params: ICreateUser): Promise<void> {
    const { firstName, lastName, email, password } = params;
    const user = new UserEntity(firstName, lastName, email, password);
    await this.CreateUserInStorage.call(user);
  }
}
