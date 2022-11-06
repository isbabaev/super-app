import { Client } from "pg";
import { UserEntity } from "../../domain/entities/user.entity";
import { IFindUserByEmailPort } from "../../domain/ports/out/find-user-by-email.port";
import { Email } from "../../domain/value-objects";

export class FindUserByEmailAdapter implements IFindUserByEmailPort {
  constructor(private readonly client: Client) {}

  async call(email: Email): Promise<UserEntity | null> {
    const result = await this.client.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const {
      id,
      first_name: firstName,
      last_name: lastName,
      password,
    } = result.rows[0];
    return new UserEntity(id, firstName, lastName, email, password);
  }
}