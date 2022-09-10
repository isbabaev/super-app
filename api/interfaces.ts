import { IncomingMessage, ServerResponse } from "node:http";

export type Handler = (
  request: IncomingMessage,
  response: ServerResponse
) => Promise<void> | void;
