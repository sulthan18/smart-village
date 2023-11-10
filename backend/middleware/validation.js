const Joi = require("@hapi/joi");

const validationMiddleware = (schema) => {
  return (server, options) => {
    server.ext("onPreHandler", (request, h) => {
      // Validasi data dari permintaan
      const { error } = schema.validate(request.payload);
      if (error) {
        return h.response({ message: "Invalid data" }).code(400);
      }
      return h.continue;
    });
  };
};

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = validationMiddleware(userSchema);
