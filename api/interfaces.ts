import { IncomingMessage, ServerResponse } from "node:http";

export type Controller = (
  request: IncomingMessage,
  response: ServerResponse
) => Promise<void> | void;

export enum HttpMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}