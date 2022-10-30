export function Post(value: string) {
  return function (target: any, propertyName: string) {
    target[propertyName].url = `POST:${value}`;
  };
}
