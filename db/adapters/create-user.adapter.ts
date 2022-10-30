import { Client } from "pg";
import { UserEntity } from "../../domain/entities/user.entity";
import { ICreateUserInStoragePort } from "../../domain/ports/out/create-user-in-storage.port";
import { DbClient } from "../client";

export class CreateUserAdapter implements ICreateUserInStoragePort {
  constructor(private readonly client: Client) {}

  async call(user: UserEntity): Promise<void> {
    await this.client.connect();

    // const result = await this.client.query(
    //   `
    //   INSERT INTO users (first_name, last_name, email, password)
    //   VALUES ($1, $2, $3, $4)
    //   `,
    //   [user.firstName, user.lastName, user.email, user.password]
    // );

    const result = await this.client.query(`SELECT 1`);

    console.log("result", result);
  }
}
