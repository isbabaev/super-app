import http, { IncomingMessage, ServerResponse } from "node:http";
import { HttpMethod } from "./interfaces";

export class Server {
  private readonly httpServer: http.Server;
  private readonly routes: IRoutes[] = [];

  constructor(controllers: unknown[]) {
    this.createRoutes(controllers);
    this.httpServer = http.createServer(async (request, response) => {
      if (request.method === undefined || request.url === undefined) {
        response.statusCode = 504;
        response.end("Method and url should be specified");
        return;
      }

      const route = this.findRoute(request);
      // TODO it would be better if the route was an entity with the method handleRoute
      await this.handleRoute(route, request, response);
    });
  }

  listen() {
    this.httpServer.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
  }

  private findRoute(request: IncomingMessage) {
    const requestHttpMethod = request.method as HttpMethod;
    const parts = request.url!.split("/").filter((part) => part !== "");
    const _routes: IRoutes[] = [];
    for (const {
      httpMethod,
      route,
      controller,
      endpoint,
      successStatusCode,
    } of this.routes) {
      if (requestHttpMethod === httpMethod) {
        _routes.push({
          httpMethod,
          route,
          controller,
          endpoint,
          successStatusCode,
        });
      }
    }

    for (let i = 0; i < parts.length; i++) {
      for (let j = 0; j < _routes.length; j++) {
        if (_routes[j].route.length === 0) continue;
        if (parts[i] !== _routes[j].route[i]) {
          const isParameter = _routes[j].route[i][0] === ":";
          if (isParameter) continue;
          _routes[j].route = [];
        }
      }
    }

    return _routes.find((route) => route.route.length > 1);
  }

  private async handleRoute(
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
      console.log(error);
    }

    response.end();
  }

  private createRoutes(controllers: any[]) {
    for (const controller of controllers) {
      const prototype = Object.getPrototypeOf(controller);
      for (const property of Object.getOwnPropertyNames(prototype)) {
        if (
          typeof controller[property] === "function" &&
          property !== "constructor"
        ) {
          const endpoint = property;
          const { url, httpMethod, successStatusCode }: IEndpoint =
            controller[endpoint];

          const route = url.split("/").filter((part) => part !== "");

          this.routes.push({
            httpMethod,
            route,
            controller,
            endpoint,
            successStatusCode,
          });
        }
      }
    }

    console.log(this.routes);
  }
}

interface IRoutes {
  httpMethod: HttpMethod;
  route: string[];
  controller: string;
  endpoint: string;
  successStatusCode: number;
}

interface IEndpoint {
  url: string;
  httpMethod: HttpMethod;
  successStatusCode: number;
}
