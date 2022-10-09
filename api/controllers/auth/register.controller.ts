import { Controller } from "../../interfaces";
import { IncomingMessage, ServerResponse } from "node:http";
import { DbClient } from '../../../db/client';

// TODO rename to controller
export const registerController: Controller = async function (
  request: IncomingMessage,
  response: ServerResponse
) {
  const buffers: Buffer[] = [];
  for await (const chunk of request) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers).toString();
  const body = JSON.parse(data);


  // response.end(JSON.parse(data))
};
