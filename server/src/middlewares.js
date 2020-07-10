const NotFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const ErrorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    status: res.statusCode,
    stack: process.env.NODE_ENV === "production" ? "lol" : error.stack,
  });
};

module.exports = { NotFound, ErrorHandler };
