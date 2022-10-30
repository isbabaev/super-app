import { Id } from "../value-objects/id";

export class UserEntity {
  constructor(
    readonly id: Id,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string
  ) {}
}
