import { Handler } from "../../interfaces";
import { IncomingMessage, ServerResponse } from "node:http";

export const registerHandler: Handler = function (
  request: IncomingMessage,
  response: ServerResponse
) {
  response.end('Hello from handler!')
};
