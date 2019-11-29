"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var viewController = _interopRequireWildcard(require("../../controllers/viewController"));

var appMiddleware = _interopRequireWildcard(require("../../middlewares/appMiddleware"));

var router = _express["default"].Router();

router.use(appMiddleware.isLoggedIn);
router.get("/", viewController.renderOverview);
router.get("/tours/:slug", viewController.renderTour);
router.get("/login", viewController.renderLogin);
var _default = router;
exports["default"] = _default;