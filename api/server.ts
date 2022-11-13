import http, { IncomingMessage, ServerResponse } from "node:http";
import { routes, createRoutes } from "./routes";
import * as newRoutes from "./new-routes";
import { parse } from "url";
import { HttpMethod } from "./interfaces";

export function createServer(controllers: unknown[]) {
  createRoutes(controllers);
  newRoutes.createRoutes(controllers);

  const server = http.createServer(async (request, response) => {
    if (request.method === undefined || request.url === undefined) {
      response.statusCode = 504;
      response.end("Method and url should be specified");
      return;
    }

    const route = findRoute(request);
    await handleRoute(route, request, response);
  });

  server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  });
}

function findRoute(request: IncomingMessage) {
  const requestHttpMethod = request.method as HttpMethod;
  const parts = request.url!.split("/").filter((part) => part !== "");
  const routes: IRoutes[] = [];
  for (const { httpMethod, route, controller, endpoint, successStatusCode } of newRoutes.routes) {
    if (requestHttpMethod === httpMethod) {
      routes.push({
        httpMethod,
        route,
        controller,
        endpoint,
        successStatusCode,
      });
    }
  }

  for (let i = 0; i < parts.length; i++) {
    for (let j = 0; j < routes.length; j++) {
      if (routes[j].route.length === 0) continue;
      if (parts[i] !== routes[j].route[i]) {
        const isParameter = routes[j].route[i][0] === ":";
        if (isParameter) continue;
        routes[j].route = [];
      }
    }
  }

  return routes.find((route) => route.route.length > 1);
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
    const result = await controller[endpoint].call(
      controller,
      request,
      response
    );
    response.statusCode = result.statusCode || successStatusCode;
    delete result.statusCode;
    response.write(JSON.stringify(result));
  } catch (error) {
    response.statusCode = 500;
    console.log(error)
  }

  response.end();
}

interface IRoutes {
  httpMethod: HttpMethod;
  route: string[];
  controller: string;
  endpoint: string;
  successStatusCode: number;
}
