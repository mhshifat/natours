import AppError from "./appError";

export default fn => (req, res, next) =>
  fn(req, res, next).catch(err =>
    err.name === "CastError"
      ? next(new AppError("Not found", 404))
      : err.name === "JsonWebTokenError"
      ? next(new AppError("Invalid Token!", 401))
      : err.name === "TokenExpiredError"
      ? next(new AppError("Token expired, please log in again!", 401))
      : next(err)
  );
