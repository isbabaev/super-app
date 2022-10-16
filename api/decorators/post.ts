import { routes } from "../routes";

export function Post(value: string) {
  return function (target: any, propertyName: string, descriptor: any) {
    routes.set(`POST:${value}`, target[propertyName]);
  };
}
