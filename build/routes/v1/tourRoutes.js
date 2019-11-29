"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var tourController = _interopRequireWildcard(require("../../controllers/tourController"));

var appMiddleware = _interopRequireWildcard(require("../../middlewares/appMiddleware"));

var tourMiddleware = _interopRequireWildcard(require("../../middlewares/tourMiddlewares"));

var userMiddleware = _interopRequireWildcard(require("../../middlewares/userMiddleware"));

var _reviewRoutes = _interopRequireDefault(require("./reviewRoutes"));

var router = _express["default"].Router();

router.use("/:tourId/reviews", _reviewRoutes["default"]);
router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(appMiddleware.protectedRoute, userMiddleware.restrictTo("admin", "lead-guide", "guide"), tourController.getMonthlyPlan);
router.route("/top-5-cheap").get(tourMiddleware.aliasTopCheapTour, tourController.getTours);
router.route("/").get(tourController.getTours).post(appMiddleware.protectedRoute, userMiddleware.restrictTo("admin", "lead-guide"), tourController.createTour);
router.route("/:tourId").get(tourController.getTour).patch(appMiddleware.protectedRoute, userMiddleware.restrictTo("admin", "lead-guide"), tourController.updateTour)["delete"](appMiddleware.protectedRoute, userMiddleware.restrictTo("admin", "lead-guide"), tourController.deleteTour);
var _default = router;
exports["default"] = _default;