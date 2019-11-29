"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMe = exports.updateMe = exports.getMe = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = exports.getUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var getUser = function getUser(req, res) {
  return res.status(500).json({
    success: false,
    message: "This route hasn't defined yet!"
  });
};

exports.getUser = getUser;
var getUsers = (0, _catchAsync["default"])(function _callee(req, res) {
  var users;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap(_userModel["default"].find());

        case 2:
          users = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            success: true,
            data: {
              users: users
            }
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getUsers = getUsers;

var createUser = function createUser(req, res) {
  return res.status(500).json({
    success: false,
    message: "This route hasn't defined yet!"
  });
};

exports.createUser = createUser;

var updateUser = function updateUser(req, res) {
  return res.status(500).json({
    success: false,
    message: "This route hasn't defined yet!"
  });
};

exports.updateUser = updateUser;

var deleteUser = function deleteUser(req, res) {
  return res.status(500).json({
    success: false,
    message: "This route hasn't defined yet!"
  });
};

exports.deleteUser = deleteUser;
var getMe = (0, _catchAsync["default"])(function _callee2(req, res) {
  var me;
  return _regenerator["default"].async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator["default"].awrap(_userModel["default"].findById(req.user.id));

        case 2:
          me = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            data: {
              me: me
            }
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getMe = getMe;
var updateMe = (0, _catchAsync["default"])(function _callee3(req, res) {
  var payload, updatedUser;
  return _regenerator["default"].async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          payload = {};
          if (req.body.name) payload.name = req.body.name;
          if (req.body.email) payload.email = req.body.email;
          _context3.next = 5;
          return _regenerator["default"].awrap(_userModel["default"].findByIdAndUpdate(req.user.id, payload, {
            "new": true,
            runValidators: true
          }));

        case 5:
          updatedUser = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            data: {
              user: updatedUser
            }
          }));

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.updateMe = updateMe;
var deleteMe = (0, _catchAsync["default"])(function _callee4(req, res) {
  var updatedUser;
  return _regenerator["default"].async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator["default"].awrap(_userModel["default"].findByIdAndUpdate(req.user.id, {
            active: false
          }, {
            "new": true,
            runValidators: true
          }));

        case 2:
          updatedUser = _context4.sent;
          return _context4.abrupt("return", res.status(204).json({
            success: true,
            data: {
              user: updatedUser
            }
          }));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.deleteMe = deleteMe;