// const notFound = async (req, res, next) => {
//   const error = new Error(`Not Found ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// const errorHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);
//   res.json({ success: false, message: err.message });
// };

// export { notFound, errorHandler };


// errorMiddleware.js

// Handle errors
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Handle 404 errors
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
