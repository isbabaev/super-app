import { Client } from "pg";
import { UserEntity } from "../../domain/entities/user.entity";
import { ICreateUserInStoragePort } from "../../domain/ports/out/create-user-in-storage.port";
import { Id } from "../../domain/value-objects/id";
import { DbClient } from "../client";

export class CreateUserAdapter implements ICreateUserInStoragePort {
  constructor(private readonly client: Client) {}

  async call(user: UserEntity): Promise<Id> {
    const result = await this.client.query(
      `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
      `,
      [user.firstName, user.lastName, user.email, user.password]
    );

    return new Id(result.rows[0].id);
  }
}
