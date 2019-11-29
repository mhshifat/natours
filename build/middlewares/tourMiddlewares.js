"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aliasTopCheapTour = void 0;

var aliasTopCheapTour = function aliasTopCheapTour(req, res, next) {
  req.query.limit = 5;
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.aliasTopCheapTour = aliasTopCheapTour;