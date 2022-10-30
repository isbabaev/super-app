import { Client } from "pg";
import {
  ICreateUserInStoragePort,
  IParams,
} from "../../domain/ports/out/create-user-in-storage.port";
import { Id } from "../../domain/value-objects/id";

export class CreateUserAdapter implements ICreateUserInStoragePort {
  constructor(private readonly client: Client) {}

  async call(params: IParams): Promise<Id> {
    const { firstName, lastName, email, password } = params;
    const result = await this.client.query(
      `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
      `,
      [firstName, lastName, email, password]
    );

    return new Id(result.rows[0].id);
  }
}
