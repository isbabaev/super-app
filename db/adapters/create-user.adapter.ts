import { Client } from "pg";
import { UserEntity } from "../../domain/entities/user.entity";
import { ICreateUserInStoragePort } from "../../domain/ports/out/create-user-in-storage.port";
import { DbClient } from "../client";

export class CreateUserAdapter implements ICreateUserInStoragePort {
  private readonly client: Client;

  constructor() {
    this.client = DbClient.getClient();
  }

  async call(user: UserEntity): Promise<void> {
    const result = await this.client.query(
      `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      `,
      [user.firstName, user.lastName, user.email, user.password]
    );

    console.log(result);
  }
}
