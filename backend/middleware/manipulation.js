const manipulationMiddleware = (server, options) => {
  server.ext("onPreResponse", (request, h) => {
    // Manipulasi permintaan atau respon di sini
    const { response } = request;
    if (response.statusCode === 200) {
      response.source.additionalInfo = "Data added by manipulation middleware";
    }
    return h.continue;
  });
};

module.exports = manipulationMiddleware;
