"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTour = exports.updateTour = exports.createTour = exports.getTours = exports.getTour = exports.getMonthlyPlan = exports.getTourStats = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _tourModel = _interopRequireDefault(require("../models/tourModel"));

var _appError = _interopRequireDefault(require("../utils/appError"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getTourStats = (0, _catchAsync["default"])(function _callee(req, res) {
  var stats;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap(_tourModel["default"].aggregate([{
            $match: {
              ratingsAverage: {
                $gte: 4.5
              }
            }
          }, {
            $group: {
              _id: {
                $toUpper: "$difficulty"
              },
              numOfTour: {
                $sum: 1
              },
              numOfRatings: {
                $sum: "$ratingsQuantity"
              },
              avgRating: {
                $avg: "$ratingsAverage"
              },
              avgPrice: {
                $avg: "$price"
              },
              minPrice: {
                $min: "$price"
              },
              maxPrice: {
                $max: "$price"
              }
            }
          }, {
            $sort: {
              avgPrice: 1
            }
          }]));

        case 2:
          stats = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            success: true,
            data: {
              stats: stats
            }
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getTourStats = getTourStats;
var getMonthlyPlan = (0, _catchAsync["default"])(function _callee2(req, res) {
  var year, plan;
  return _regenerator["default"].async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          year = req.params.year * 1;
          _context2.next = 3;
          return _regenerator["default"].awrap(_tourModel["default"].aggregate([{
            $unwind: "$startDates"
          }, {
            $match: {
              startDates: {
                $gte: new Date("".concat(year, "-01-01")),
                $lte: new Date("".concat(year, "-12-31"))
              }
            }
          }, {
            $group: {
              _id: {
                $month: "$startDates"
              },
              numOfTour: {
                $sum: 1
              },
              tours: {
                $push: "$name"
              }
            }
          }, {
            $addFields: {
              month: "$_id"
            }
          }, {
            $project: {
              _id: 0
            }
          }, {
            $sort: {
              numOfTour: -1
            }
          }, {
            $limit: 12
          }]));

        case 3:
          plan = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            data: {
              plan: plan
            }
          }));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getMonthlyPlan = getMonthlyPlan;
var getTour = (0, _catchAsync["default"])(function _callee3(req, res) {
  var tour;
  return _regenerator["default"].async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator["default"].awrap(_tourModel["default"].findById(req.params.tourId).populate("reviews"));

        case 2:
          tour = _context3.sent;

          if (tour) {
            _context3.next = 5;
            break;
          }

          throw new _appError["default"]("Tour not found", 404);

        case 5:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            data: {
              tour: tour
            }
          }));

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getTour = getTour;
var getTours = (0, _catchAsync["default"])(function _callee4(req, res) {
  var excludedFields, queryObj, sortBy, selectedStr, page, limit, skip, tours;
  return _regenerator["default"].async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // Modifying req.query to filter more efficiently
          excludedFields = ["sort", "limit", "page", "fields"];
          queryObj = _objectSpread({}, req.query); // Filtering...

          excludedFields.forEach(function (el) {
            return delete queryObj[el];
          }); // Advance filtering...

          queryObj = JSON.parse(JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g, function (match) {
            return "$".concat(match);
          })); // Sorting...

          sortBy = req.query.sort ? req.query.sort.replace(/,/g, " ") : "-createdAt"; // Filter by fields...

          selectedStr = req.query.fields ? req.query.fields.replace(/,/g, " ") : "-__v"; // Pagination...

          page = req.query.page * 1 || 1;
          limit = req.query.limit * 1 || 100;
          skip = (page - 1) * limit;
          _context4.next = 11;
          return _regenerator["default"].awrap(_tourModel["default"].find(queryObj).sort(sortBy).select(selectedStr).skip(skip).limit(limit));

        case 11:
          tours = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            result: tours.length,
            data: {
              tours: tours
            }
          }));

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.getTours = getTours;
var createTour = (0, _catchAsync["default"])(function _callee5(req, res) {
  var createdTour;
  return _regenerator["default"].async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator["default"].awrap(_tourModel["default"].create(req.body));

        case 2:
          createdTour = _context5.sent;
          return _context5.abrupt("return", res.status(201).json({
            success: true,
            data: {
              tour: createdTour
            }
          }));

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.createTour = createTour;
var updateTour = (0, _catchAsync["default"])(function _callee6(req, res) {
  var updatedTour;
  return _regenerator["default"].async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _regenerator["default"].awrap(_tourModel["default"].findByIdAndUpdate(req.params.tourId, req.body, {
            "new": true,
            runValidators: true
          }));

        case 2:
          updatedTour = _context6.sent;
          return _context6.abrupt("return", res.status(200).json({
            success: true,
            data: {
              tour: updatedTour
            }
          }));

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.updateTour = updateTour;
var deleteTour = (0, _catchAsync["default"])(function _callee7(req, res) {
  var deletedTour;
  return _regenerator["default"].async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _regenerator["default"].awrap(_tourModel["default"].findByIdAndRemove(req.params.tourId));

        case 2:
          deletedTour = _context7.sent;
          return _context7.abrupt("return", res.status(204).json({
            success: true,
            data: deletedTour
          }));

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.deleteTour = deleteTour;