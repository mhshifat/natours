"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var reviewSchema = new _mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review can not be empty"]
  },
  ratting: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  },
  tour: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: [true, "Review must belong to a tour!"]
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user!"]
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo"
  });
  next();
});

var _default = (0, _mongoose.model)("Review", reviewSchema);

exports["default"] = _default;