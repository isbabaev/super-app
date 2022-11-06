import { Client } from "pg";
import { UserEntity } from "../../domain/entities/user.entity";
import { IFindUserByCredentialsPort, IParams } from "../../domain/ports/out/find-user-by-credentials.port";

export class FindUserByCredentialsAdapter implements IFindUserByCredentialsPort {
  constructor(private readonly client: Client) {}

  async call(params: IParams): Promise<UserEntity | null> {
    const result = await this.client.query(
      `
      SELECT *
      FROM users
      WHERE email = $1 AND password = $2
      `,
      [params.email, params.password]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const {
      id,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    } = result.rows[0];
    return new UserEntity(id, firstName, lastName, email, password);
  }
}

// TODO store password in hash
