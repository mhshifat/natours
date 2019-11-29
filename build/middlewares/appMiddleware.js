"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = exports.protectedRoute = exports.errorHandling = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _jsonwebtoken = require("jsonwebtoken");

var _config = _interopRequireDefault(require("../config"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _appError = _interopRequireDefault(require("../utils/appError"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var jwt = _config["default"].jwt; // eslint-disable-next-line no-unused-vars

var errorHandling = function errorHandling(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message
  });
};

exports.errorHandling = errorHandling;
var protectedRoute = (0, _catchAsync["default"])(function _callee(req, res, next) {
  var authorizationHeader, token, decodedToken, freshUser;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          authorizationHeader = req.get("authorization");

          if (!(!req.cookies.jwt || authorizationHeader && !authorizationHeader.startsWith("Bearer"))) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", next(new _appError["default"]("You are not authorized!", 401)));

        case 3:
          token = req.cookies.jwt || authorizationHeader.split(" ")[1];

          if (token) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", next(new _appError["default"]("You are not authorized!", 401)));

        case 6:
          decodedToken = (0, _jsonwebtoken.verify)(token, jwt.secret);

          if (decodedToken) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", next(new _appError["default"]("You are not authorized!", 401)));

        case 9:
          _context.next = 11;
          return _regenerator["default"].awrap(_userModel["default"].findById(decodedToken.id));

        case 11:
          freshUser = _context.sent;

          if (!(!freshUser || freshUser.passwordChangedAfter(decodedToken.iat))) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", next(new _appError["default"]("You are not authorized!", 401)));

        case 14:
          req.user = freshUser;
          next();

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.protectedRoute = protectedRoute;

var isLoggedIn = function isLoggedIn(req, res, next) {
  var token, decodedToken, freshUser;
  return _regenerator["default"].async(function isLoggedIn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (req.cookies.jwt) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next());

        case 3:
          token = req.cookies.jwt;

          if (token) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", next());

        case 6:
          decodedToken = (0, _jsonwebtoken.verify)(token, jwt.secret);

          if (decodedToken) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", next());

        case 9:
          _context2.next = 11;
          return _regenerator["default"].awrap(_userModel["default"].findById(decodedToken.id));

        case 11:
          freshUser = _context2.sent;

          if (!(!freshUser || freshUser.passwordChangedAfter(decodedToken.iat))) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", next());

        case 14:
          res.locals.user = freshUser;
          return _context2.abrupt("return", next());

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", next());

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.isLoggedIn = isLoggedIn;