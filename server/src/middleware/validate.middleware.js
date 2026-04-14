const logger = require("../utils/logger");

const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: result.error.errors,
      });
    }

    req.body = result.data;

    next();
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports = validate;
