import { HttpMethod } from "../interfaces";

export function Post(value: string = '/') {
  return function (target: any, propertyName: string) {
    target[propertyName].url = value;
    target[propertyName].httpMethod = HttpMethod.POST;
    target[propertyName].successStatusCode = 201;
  };
}
