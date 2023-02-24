function errorHandler(err, res, statusCode = 500) {
    const errors = {};
  
    switch (statusCode) {
      case 400:
        errors.status = statusCode;
        errors.title = "Bad Request";
        errors.detail = err.message;
        break;
      case 401:
        errors.status = statusCode;
        errors.title = "Unauthorized";
        errors.detail = err.message || "Unauthorized";
        break;
      case 403:
        errors.status = statusCode;
        errors.title = "Forbidden";
        errors.detail = err.message || "Forbidden";
        break;
      case 404:
        errors.status = statusCode;
        errors.title = "Not Found";
        errors.detail = err.message || "Not Found";
        break;
      case 422:
        errors.status = statusCode;
        errors.title = "Unprocessable Entity";
        errors.detail = err.message || "Unprocessable Entity";
        break;
      case 500:
      default:
        errors.status = statusCode;
        errors.title = "Internal Server Error";
        errors.detail = err.message || "Internal Server Error";
    }
  
    res.status(statusCode).json({ errors });
  }
  
  module.exports = { errorHandler };