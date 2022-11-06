export const routes = new Map<string, any>();

export function createRoutes(controllers: any[]) {
  for (const controller of controllers) {
    const prototype = Object.getPrototypeOf(controller);
    for (const property of Object.getOwnPropertyNames(prototype)) {
      if (
        property !== "constructor" &&
        typeof controller[property] === "function"
      ) {
        const endpoint = property;
        const { url, successStatusCode } = controller[endpoint];
        routes.set(url, { controller, endpoint, successStatusCode });
      }
    }
  }
}
