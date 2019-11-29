"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var authController = _interopRequireWildcard(require("../../controllers/authController"));

var appMiddleware = _interopRequireWildcard(require("../../middlewares/appMiddleware"));

var router = _express["default"].Router();

router.route("/login").post(authController.loginUser);
router.route("/register").post(authController.registerUser);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password/:token").patch(authController.resetPassword);
router.route("/update-password").patch(appMiddleware.protectedRoute, authController.updateMyPassword);
router.route("/logout").get(authController.logout);
var _default = router;
exports["default"] = _default;