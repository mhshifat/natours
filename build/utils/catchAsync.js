"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appError = _interopRequireDefault(require("./appError"));

var _default = function _default(fn) {
  return function (req, res, next) {
    return fn(req, res, next)["catch"](function (err) {
      return err.name === "CastError" ? next(new _appError["default"]("Not found", 404)) : err.name === "JsonWebTokenError" ? next(new _appError["default"]("Invalid Token!", 401)) : err.name === "TokenExpiredError" ? next(new _appError["default"]("Token expired, please log in again!", 401)) : next(err);
    });
  };
};

exports["default"] = _default;