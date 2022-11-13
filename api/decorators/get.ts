import { HttpMethod } from "../interfaces";

export function Get(value: string) {
  return function (target: any, propertyName: string) {
    target[propertyName].url = value;
    target[propertyName].httpMethod = HttpMethod.GET;
    target[propertyName].successStatusCode = 200;
  };
}
