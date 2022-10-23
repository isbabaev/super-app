export interface ICreateUserPort {
  call(params: ICreateUser): Promise<void>;
}

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
