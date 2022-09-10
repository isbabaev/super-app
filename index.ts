import http from "node:http";
import { routes } from "./api/routes";

const PORT = 3000;

const server = http.createServer(async (request, response) => {
  if (request.method === undefined || request.url === undefined) {
    response.statusCode = 504;
    response.end("Method and url should be specified");
    return;
  }
  const url = request.method.concat(":", request.url);

  const handler = routes.get(url);
  if (!handler) {
    response.statusCode = 404;
    response.end();
    return;
  }

  await handler(request, response);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
