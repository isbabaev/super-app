import { HttpMethod } from "./interfaces";

export const routes: IRoutes[] = [];

// TODO move to server.ts
export function createRoutes(controllers: any[]) {
  for (const controller of controllers) {
    const prototype = Object.getPrototypeOf(controller);
    for (const property of Object.getOwnPropertyNames(prototype)) {
      if (
        typeof controller[property] === "function" &&
        property !== "constructor"
      ) {
        const endpoint = property;
        const { url, httpMethod }: IEndpoint = controller[endpoint];

        const route = url.split("/").filter((part) => part !== "");

        routes.push({ httpMethod, route, controller, endpoint });
      }
    }
  }

  console.log(routes);
}

interface IRoutes {
  httpMethod: HttpMethod;
  route: string[];
  controller: string;
  endpoint: string;
}

interface IEndpoint {
  url: string;
  httpMethod: HttpMethod;
}
