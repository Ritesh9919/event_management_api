import ApiError from "../utils/apiError.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(err.statusCode).json({ message: err.message });
};

export default errorHandlerMiddleware;
