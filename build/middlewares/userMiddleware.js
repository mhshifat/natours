"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restrictTo = void 0;

var _appError = _interopRequireDefault(require("../utils/appError"));

var restrictTo = function restrictTo() {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function (req, res, next) {
    if (!roles.includes(req.user.role)) return next(new _appError["default"]("You do not have permission to perform this action!", 403));
    next();
  };
};

exports.restrictTo = restrictTo;