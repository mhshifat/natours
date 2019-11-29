"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.updateMyPassword = exports.resetPassword = exports.forgotPassword = exports.registerUser = exports.loginUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _bcryptjs = require("bcryptjs");

var _crypto = _interopRequireDefault(require("crypto"));

var _jsonwebtoken = require("jsonwebtoken");

var _config = _interopRequireDefault(require("../config"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _appError = _interopRequireDefault(require("../utils/appError"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var _email = require("../utils/email");

var jwt = _config["default"].jwt;
var loginUser = (0, _catchAsync["default"])(function _callee(req, res, next) {
  var _req$body, email, password, existingUser, isPwdMatched, token;

  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!(!email || !password)) {
            _context.next = 3;
            break;
          }

          throw new _appError["default"]("Please provide email & password!", 400);

        case 3:
          _context.next = 5;
          return _regenerator["default"].awrap(_userModel["default"].findOne({
            email: email
          }).select("+password"));

        case 5:
          existingUser = _context.sent;

          if (existingUser) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", next(new _appError["default"]("Wrong credentials!", 400)));

        case 8:
          _context.next = 10;
          return _regenerator["default"].awrap((0, _bcryptjs.compare)(password, existingUser.password));

        case 10:
          isPwdMatched = _context.sent;

          if (isPwdMatched) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", next(new _appError["default"]("Wrong credentials!", 400)));

        case 13:
          token = (0, _jsonwebtoken.sign)({
            id: existingUser.id
          }, jwt.secret, {
            expiresIn: jwt.expires
          });
          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
          });
          res.status(200).json({
            success: true,
            token: token
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.loginUser = loginUser;
var registerUser = (0, _catchAsync["default"])(function _callee2(req, res) {
  var createdUser, token;
  return _regenerator["default"].async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator["default"].awrap(_userModel["default"].create(req.body));

        case 2:
          createdUser = _context2.sent;
          token = (0, _jsonwebtoken.sign)({
            id: createdUser.id
          }, jwt.secret, {
            expiresIn: jwt.expires
          });
          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
          });
          res.status(201).json({
            success: true,
            token: token,
            data: {
              user: createdUser
            }
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.registerUser = registerUser;
var forgotPassword = (0, _catchAsync["default"])(function _callee3(req, res, next) {
  var user, resetToken, resetUrl;
  return _regenerator["default"].async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator["default"].awrap(_userModel["default"].findOne({
            email: req.body.email
          }));

        case 2:
          user = _context3.sent;

          if (user) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", next(new _appError["default"]("User not exist!", 404)));

        case 5:
          resetToken = user.createResetPasswordToken();
          _context3.next = 8;
          return _regenerator["default"].awrap(user.save({
            validateBeforeSave: false
          }));

        case 8:
          _context3.prev = 8;
          resetUrl = "".concat(req.protocol, "://").concat(req.get("host"), "/api/v1/resetPassword/").concat(resetToken);
          _context3.next = 12;
          return _regenerator["default"].awrap((0, _email.sendEmail)({
            email: req.body.email,
            subject: "Reset your natours account password ( Valid for 10 minute )",
            message: "Reset password token: ".concat(resetUrl)
          }));

        case 12:
          _context3.next = 21;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](8);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          _context3.next = 20;
          return _regenerator["default"].awrap(user.save({
            validateBeforeSave: false
          }));

        case 20:
          return _context3.abrupt("return", next(new _appError["default"]("Something went wrong, please try again later!", 500)));

        case 21:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            message: "Email has sent!"
          }));

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[8, 14]]);
});
exports.forgotPassword = forgotPassword;
var resetPassword = (0, _catchAsync["default"])(function _callee4(req, res, next) {
  var hashedPassword, user, token;
  return _regenerator["default"].async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          hashedPassword = _crypto["default"].createHash("sha256").update(req.params.token).digest("hex");
          _context4.next = 3;
          return _regenerator["default"].awrap(_userModel["default"].findOne({
            resetPasswordToken: hashedPassword,
            resetPasswordExpires: {
              $gt: Date.now()
            }
          }));

        case 3:
          user = _context4.sent;

          if (user) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", next(new _appError["default"]("Token has expired!", 400)));

        case 6:
          user.password = req.body.password;
          user.passwordConfirm = req.body.passwordConfirm;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          _context4.next = 12;
          return _regenerator["default"].awrap(user.save());

        case 12:
          token = (0, _jsonwebtoken.sign)({
            id: user.id
          }, jwt.secret, {
            expiresIn: jwt.expires
          });
          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
          });
          res.status(200).json({
            success: true,
            token: token
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.resetPassword = resetPassword;
var updateMyPassword = (0, _catchAsync["default"])(function _callee5(req, res, next) {
  var user, isPwdMatched, token;
  return _regenerator["default"].async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator["default"].awrap(_userModel["default"].findById(req.user.id).select("+password"));

        case 2:
          user = _context5.sent;
          _context5.next = 5;
          return _regenerator["default"].awrap((0, _bcryptjs.compare)(req.body.passwordCurrent, user.password));

        case 5:
          isPwdMatched = _context5.sent;

          if (isPwdMatched) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", next(new _appError["default"]("Wrong password!", 400)));

        case 8:
          user.password = req.body.password;
          user.passwordConfirm = req.body.passwordConfirm;
          _context5.next = 12;
          return _regenerator["default"].awrap(user.save());

        case 12:
          token = (0, _jsonwebtoken.sign)({
            id: user.id
          }, jwt.secret, {
            expiresIn: jwt.expires
          });
          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
          });
          res.status(200).json({
            success: true,
            token: token
          });

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.updateMyPassword = updateMyPassword;

var logout = function logout(req, res) {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({
    success: true
  });
};

exports.logout = logout;