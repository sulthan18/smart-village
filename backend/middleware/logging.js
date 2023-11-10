const loggingMiddleware = (server, options) => {
  server.ext("onRequest", (request, h) => {
    // Lakukan logging permintaan di sini
    console.log(`Request: ${request.method} ${request.path}`);
    return h.continue;
  });

  server.ext("onPreResponse", (request, h) => {
    // Lakukan logging respon di sini
    const { response } = request;
    console.log(`Response status code: ${response.statusCode}`);
    return h.continue;
  });
};

module.exports = loggingMiddleware;
