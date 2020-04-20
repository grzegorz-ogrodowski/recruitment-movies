import { includes, has, get, map, uniqBy } from "lodash";
import Joi from "joi";
const schemas = require("../schemas");

export default () => {
  const _supportedMethods = ["post", "get"];
  const _validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  return (req, res, next) => {
    const method = req.method.toLowerCase();
    if (includes(_supportedMethods, method)) {
      var _schema = schemas.default.find((item) => item.method === method);
      if (_schema) {
        return Joi.validate(
          req.body,
          _schema.schema,
          _validationOptions,
          (err, data) => {
            if (err) {
              var validationErrors = map(err.details, ({ message, type }) => ({
                field: message.replace(/['"]/g, ""),
              }));
              res.status(400).json(uniqBy(validationErrors, "field"));
            } else {
              next();
            }
          }
        );
      }
      res
        .status(500)
        .json({ error: "Invalid data. Please contact administrator" });
    }
    next();
  };
};
