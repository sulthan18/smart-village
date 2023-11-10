const authenticationMiddleware = (server, options) => {
  server.auth.strategy('jwt', 'jwt', {
    key: 'your-secret-key',
    validate: (decoded, request, h) => {
      // Tambahkan logika otentikasi JWT di sini
      // Misalnya, verifikasi apakah pengguna ada dalam database
      return { isValid: true, credentials: decoded };
    },
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.auth.default('jwt');

  server.ext('onPreHandler', async (request, h) => {
    // Lakukan autentikasi pengguna di sini
    try {
      await request.auth.authenticate('jwt');
      return h.continue;
    } catch (err) {
      return h.response({ message: 'Authentication failed' }).code(401);
    }
  });
};

module.exports = authenticationMiddleware;
