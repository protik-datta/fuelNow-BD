/**
 * A wrapper to handle async errors in Express routes
 * and pass them to the next middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
