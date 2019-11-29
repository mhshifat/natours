import AppError from "../utils/appError";

export const global404Route = (req, res, next) => {
  next(new AppError((`Can't find ${req.originalUrl} on this server!`, 404)));
};
