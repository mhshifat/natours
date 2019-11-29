import { verify } from "jsonwebtoken";
import config from "../config";
import User from "../models/userModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const { jwt } = config;

// eslint-disable-next-line no-unused-vars
export const errorHandling = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message
  });
};

export const protectedRoute = catchAsync(async (req, res, next) => {
  const authorizationHeader = req.get("authorization");
  if (
    !req.cookies.jwt ||
    (authorizationHeader && !authorizationHeader.startsWith("Bearer"))
  )
    return next(new AppError("You are not authorized!", 401));
  const token = req.cookies.jwt || authorizationHeader.split(" ")[1];
  if (!token) return next(new AppError("You are not authorized!", 401));
  const decodedToken = verify(token, jwt.secret);
  if (!decodedToken) return next(new AppError("You are not authorized!", 401));
  const freshUser = await User.findById(decodedToken.id);
  if (!freshUser || freshUser.passwordChangedAfter(decodedToken.iat))
    return next(new AppError("You are not authorized!", 401));
  req.user = freshUser;
  next();
});

export const isLoggedIn = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) return next();
    const token = req.cookies.jwt;
    if (!token) return next();
    const decodedToken = verify(token, jwt.secret);
    if (!decodedToken) return next();
    const freshUser = await User.findById(decodedToken.id);
    if (!freshUser || freshUser.passwordChangedAfter(decodedToken.iat))
      return next();
    res.locals.user = freshUser;
    return next();
  } catch (err) {
    return next();
  }
};
