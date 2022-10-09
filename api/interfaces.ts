import { IncomingMessage, ServerResponse } from "node:http";

export type Controller = (
  request: IncomingMessage,
  response: ServerResponse
) => Promise<void> | void;
