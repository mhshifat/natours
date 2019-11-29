"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.global404Route = void 0;

var _appError = _interopRequireDefault(require("../utils/appError"));

var global404Route = function global404Route(req, res, next) {
  next(new _appError["default"](("Can't find ".concat(req.originalUrl, " on this server!"), 404)));
};

exports.global404Route = global404Route;