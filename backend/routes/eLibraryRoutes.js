const Hapi = require("@hapi/hapi");
const eLibraryController = require("../controllers/eLibraryController"); // Import eLibraryController
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  // Middleware authentication
  server.ext("onPreHandler", authentication);

  // Contoh penggunaan middleware otorisasi
  server.route({
    method: "GET",
    path: "/admin",
    handler: function (request, h) {
      if (authorization("admin")(request)) {
        return "Halo, admin!";
      } else {
        return "Anda tidak diizinkan mengakses halaman ini.";
      }
    },
  });

  server.route({
    method: "POST",
    path: "/books",
    handler: eLibraryController.addBookHandler, // Gunakan handler dari eLibraryController
  });

  server.route({
    method: "GET",
    path: "/books",
    handler: eLibraryController.getAllBookHandler, // Gunakan handler dari eLibraryController
  });

  server.route({
    method: "GET",
    path: "/books/{bookId}",
    handler: eLibraryController.getBookByIdHandler, // Gunakan handler dari eLibraryController
  });

  server.route({
    method: "PUT",
    path: "/books/{bookId}",
    handler: eLibraryController.editBookHandler, // Gunakan handler dari eLibraryController
  });

  server.route({
    method: "DELETE",
    path: "/books/{bookId}",
    handler: eLibraryController.deleteBookHandler, // Gunakan handler dari eLibraryController
  });

  await server.start();
  console.log("Server berjalan pada", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
