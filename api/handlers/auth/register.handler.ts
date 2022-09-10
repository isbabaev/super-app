import { Handler } from "../../interfaces";
import { IncomingMessage, ServerResponse } from "node:http";
import jwt from "jsonwebtoken";

export const registerHandler: Handler = function (
  request: IncomingMessage,
  response: ServerResponse
) {
  // jwt.sign()
  response.end('Hello from handler!')
};
