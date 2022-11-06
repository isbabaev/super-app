import { Id, FirstName, LastName, Email, Password } from "../value-objects";

export class UserEntity {
  constructor(
    readonly id: Id,
    readonly firstName: FirstName,
    readonly lastName: LastName,
    readonly email: Email,
    readonly password: Password
  ) {}
}
