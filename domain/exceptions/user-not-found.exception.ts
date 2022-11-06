export class UserNotFoundException extends Error {
  constructor() {
    super('User is not found');
  }
}