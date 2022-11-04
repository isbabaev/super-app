export function Get(value: string) {
  return function (target: any, propertyName: string) {
    target[propertyName].url = `GET:${value}`;
    target[propertyName].successStatusCode = 200;
  };
}
