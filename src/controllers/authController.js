import { compare } from "bcryptjs";
import crypto from "crypto";
import { sign } from "jsonwebtoken";
import config from "../config";
import User from "../models/userModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { sendEmail } from "../utils/email";

const { jwt } = config;

export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new AppError("Please provide email & password!", 400);
  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) return next(new AppError("Wrong credentials!", 400));
  const isPwdMatched = await compare(password, existingUser.password);
  if (!isPwdMatched) return next(new AppError("Wrong credentials!", 400));

  const token = sign({ id: existingUser.id }, jwt.secret, {
    expiresIn: jwt.expires
  });

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    token
  });
});

export const registerUser = catchAsync(async (req, res) => {
  const createdUser = await User.create(req.body);
  const token = sign({ id: createdUser.id }, jwt.secret, {
    expiresIn: jwt.expires
  });

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true
  });

  res.status(201).json({
    success: true,
    token,
    data: {
      user: createdUser
    }
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("User not exist!", 404));
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/resetPassword/${resetToken}`;
    await sendEmail({
      email: req.body.email,
      subject: "Reset your natours account password ( Valid for 10 minute )",
      message: `Reset password token: ${resetUrl}`
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("Something went wrong, please try again later!", 500)
    );
  }

  return res.status(200).json({
    success: true,
    message: "Email has sent!"
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedPassword,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) return next(new AppError("Token has expired!", 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  const token = sign({ id: user.id }, jwt.secret, {
    expiresIn: jwt.expires
  });

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    token
  });
});

export const updateMyPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPwdMatched = await compare(req.body.passwordCurrent, user.password);
  if (!isPwdMatched) return next(new AppError("Wrong password!", 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  const token = sign({ id: user.id }, jwt.secret, {
    expiresIn: jwt.expires
  });

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    token
  });
});

export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({
    success: true
  });
};
