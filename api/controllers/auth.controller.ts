import { IncomingMessage, ServerResponse } from "node:http";
import { Post } from "../decorators/post";
import { IRegisterBody } from "../interfaces/auth.interfaces";
import { parseBody } from "./utils";

export class AuthController {
  @Post('/api/auth/register')
  async register(request: IncomingMessage, response: ServerResponse) {
    const body = await parseBody<IRegisterBody>(request);
  }
}
