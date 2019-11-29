"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("dotenv/config");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _reviewModel = _interopRequireDefault(require("../../models/reviewModel"));

var _tourModel = _interopRequireDefault(require("../../models/tourModel"));

var _userModel = _interopRequireDefault(require("../../models/userModel"));

var _reviews = _interopRequireDefault(require("./reviews.json"));

var _tours = _interopRequireDefault(require("./tours.json"));

var _users = _interopRequireDefault(require("./users.json"));

var importTourData = function importTourData() {
  return _regenerator["default"].async(function importTourData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("[ NATOURS ] Starting import process!");
          _context.next = 4;
          return _regenerator["default"].awrap(_tourModel["default"].create(_tours["default"], {
            validateBeforeSave: false
          }));

        case 4:
          _context.next = 6;
          return _regenerator["default"].awrap(_userModel["default"].create(_users["default"], {
            validateBeforeSave: false
          }));

        case 6:
          _context.next = 8;
          return _regenerator["default"].awrap(_reviewModel["default"].create(_reviews["default"], {
            validateBeforeSave: false
          }));

        case 8:
          console.log("[ NATOURS ] Tour dev data imported successfully!");
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 14:
          process.exit();

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var removeTourData = function removeTourData() {
  return _regenerator["default"].async(function removeTourData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log("[ NATOURS ] Starting delete process!");
          _context2.next = 4;
          return _regenerator["default"].awrap(_tourModel["default"].deleteMany());

        case 4:
          _context2.next = 6;
          return _regenerator["default"].awrap(_userModel["default"].deleteMany());

        case 6:
          _context2.next = 8;
          return _regenerator["default"].awrap(_reviewModel["default"].deleteMany());

        case 8:
          console.log("[ NATOURS ] Tour dev data removed successfully!");
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 14:
          process.exit();

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

_mongoose["default"].connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function _callee() {
  return _regenerator["default"].async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!(process.argv[2] === "--import")) {
            _context3.next = 5;
            break;
          }

          _context3.next = 3;
          return _regenerator["default"].awrap(importTourData());

        case 3:
          _context3.next = 11;
          break;

        case 5:
          if (!(process.argv[2] === "--delete")) {
            _context3.next = 10;
            break;
          }

          _context3.next = 8;
          return _regenerator["default"].awrap(removeTourData());

        case 8:
          _context3.next = 11;
          break;

        case 10:
          console.log("[ NATOURS ] Please specify either --import or --delete in the command!");

        case 11:
          process.exit(0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
})["catch"](function (err) {
  console.log(err);
  process.exit();
});