import { IncomingMessage, ServerResponse } from "node:http";
import { Post } from "../decorators/post";

export class AuthController {
  @Post('/api/auth/register')
  async register(request: IncomingMessage, response: ServerResponse) {

    const buffers: Buffer[] = [];
    for await (const chunk of request) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    const body = JSON.parse(data);

    console.log("body", body);
  }
}
