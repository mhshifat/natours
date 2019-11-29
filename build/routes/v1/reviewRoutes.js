"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var reviewController = _interopRequireWildcard(require("../../controllers/reviewController"));

var appMiddleware = _interopRequireWildcard(require("../../middlewares/appMiddleware"));

var userMiddleware = _interopRequireWildcard(require("../../middlewares/userMiddleware"));

var router = _express["default"].Router({
  mergeParams: true
});

router.use(appMiddleware.protectedRoute);
router.route("/").get(reviewController.getReviews).post(appMiddleware.protectedRoute, userMiddleware.restrictTo("user"), reviewController.createReview);
router.route("/:reviewId").get(reviewController.getReview).patch(userMiddleware.restrictTo("user", "admin"), reviewController.updateReview)["delete"](userMiddleware.restrictTo("user", "admin"), reviewController.deleteReview);
var _default = router;
exports["default"] = _default;