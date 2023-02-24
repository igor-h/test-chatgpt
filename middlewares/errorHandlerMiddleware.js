function errorHandlerMiddleware(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
  
    console.error(err);
  
    const statusCode = err.status || 500;
    const message = err.message || 'Internal server error';
  
    res.status(statusCode).json({ error: message });
  }
  
  module.exports = errorHandlerMiddleware;