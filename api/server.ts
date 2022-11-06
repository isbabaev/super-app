import http, { IncomingMessage, ServerResponse } from "node:http";
import { routes, createRoutes } from "./routes";

export function createServer(controllers: unknown[]) {
  createRoutes(controllers);

  const server = http.createServer(async (request, response) => {
    if (request.method === undefined || request.url === undefined) {
      response.statusCode = 504;
      response.end("Method and url should be specified");
      return;
    }
    const url = request.method.concat(":", request.url);
    const route = routes.get(url);
    await handleRoute(route, request, response);
  });

  server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  });
}

async function handleRoute(
  route: any,
  request: IncomingMessage,
  response: ServerResponse
) {
  if (!route) {
    response.statusCode = 404;
    response.end();
    return;
  }

  const { controller, endpoint, successStatusCode } = route;
  try {
    const result = await controller[endpoint].call(controller, request, response);
    response.statusCode = result.statusCode || successStatusCode;
    delete result.statusCode;
    response.write(JSON.stringify(result));
  } catch (error) {
    response.statusCode = 500;
  }

  response.end();
}
