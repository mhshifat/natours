"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteReview = exports.updateReview = exports.getReview = exports.createReview = exports.getReviews = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _reviewModel = _interopRequireDefault(require("../models/reviewModel"));

var _appError = _interopRequireDefault(require("../utils/appError"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getReviews = (0, _catchAsync["default"])(function _callee(req, res) {
  var reviews;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap(_reviewModel["default"].find(req.params.tourId || {}));

        case 2:
          reviews = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            success: true,
            data: {
              reviews: reviews
            }
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getReviews = getReviews;
var createReview = (0, _catchAsync["default"])(function _callee2(req, res) {
  var createdReview;
  return _regenerator["default"].async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.body.tour) req.body.tour = req.params.tourId;
          if (!req.body.user) req.body.user = req.user.id;
          _context2.next = 4;
          return _regenerator["default"].awrap(_reviewModel["default"].create(req.body));

        case 4:
          createdReview = _context2.sent;
          return _context2.abrupt("return", res.status(201).json({
            success: true,
            data: {
              review: createdReview
            }
          }));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.createReview = createReview;
var getReview = (0, _catchAsync["default"])(function _callee3(req, res) {
  var query, review;
  return _regenerator["default"].async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          query = {};
          if (req.params.tourId) query.tour = req.params.tourId;
          _context3.next = 4;
          return _regenerator["default"].awrap(_reviewModel["default"].findOne(_objectSpread({}, query, {
            _id: req.params.reviewId
          })));

        case 4:
          review = _context3.sent;

          if (review) {
            _context3.next = 7;
            break;
          }

          throw new _appError["default"]("Review not found", 404);

        case 7:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            data: {
              review: review
            }
          }));

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getReview = getReview;
var updateReview = (0, _catchAsync["default"])(function _callee4(req, res) {
  var updatedReview;
  return _regenerator["default"].async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator["default"].awrap(_reviewModel["default"].findByIdAndUpdate(req.params.reviewId, req.body, {
            "new": true,
            runValidators: true
          }));

        case 2:
          updatedReview = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            data: {
              review: updatedReview
            }
          }));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.updateReview = updateReview;
var deleteReview = (0, _catchAsync["default"])(function _callee5(req, res) {
  var deletedReview;
  return _regenerator["default"].async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator["default"].awrap(_reviewModel["default"].findByIdAndRemove(req.params.reviewId));

        case 2:
          deletedReview = _context5.sent;
          return _context5.abrupt("return", res.status(204).json({
            success: true,
            data: deletedReview
          }));

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.deleteReview = deleteReview;