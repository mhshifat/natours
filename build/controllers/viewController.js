"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderLogin = exports.renderTour = exports.renderOverview = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _tourModel = _interopRequireDefault(require("../models/tourModel"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var renderOverview = (0, _catchAsync["default"])(function _callee(req, res) {
  var tours;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap(_tourModel["default"].find({}));

        case 2:
          tours = _context.sent;
          res.status(200).render("overview", {
            title: "All Tours",
            tours: tours
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.renderOverview = renderOverview;
var renderTour = (0, _catchAsync["default"])(function _callee2(req, res) {
  var tour;
  return _regenerator["default"].async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator["default"].awrap(_tourModel["default"].findOne({
            slug: req.params.slug
          }).populate({
            path: "reviews",
            fields: "review rating user"
          }));

        case 2:
          tour = _context2.sent;
          res.status(200).render("tour", {
            title: tour.name,
            tour: tour
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.renderTour = renderTour;

var renderLogin = function renderLogin(req, res) {
  res.status(200).render("login", {
    title: "Login into your account!"
  });
};

exports.renderLogin = renderLogin;