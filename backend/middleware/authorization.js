const authorizationMiddleware = (server, options) => {
  server.ext("onPreHandler", (request, h) => {
    // Tambahkan logika otorisasi di sini
    const { role } = request.auth.credentials;
    if (role !== "admin") {
      return h.response({ message: "Permission denied" }).code(403);
    }
    return h.continue;
  });
};

module.exports = authorizationMiddleware;
