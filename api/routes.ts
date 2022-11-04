export const routes = new Map<string, any>();

export function createRoutes(controllers: any[]) {
  for (const controller of controllers) {
    for (const property in controller) {
      if (typeof controller[property] === "function") {
        const endpoint = property;
        const { url, successStatusCode } = controller[endpoint];
        routes.set(url, { controller, endpoint, successStatusCode });
      }
    }
  }
}