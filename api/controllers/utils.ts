import { IncomingMessage } from "node:http";

export async function parseBody<T>(request: IncomingMessage): Promise<T> {
  const buffers: Buffer[] = [];
  for await (const chunk of request) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
}