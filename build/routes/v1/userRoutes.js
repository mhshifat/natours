"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var userController = _interopRequireWildcard(require("../../controllers/userController"));

var appMiddleware = _interopRequireWildcard(require("../../middlewares/appMiddleware"));

var userMiddleware = _interopRequireWildcard(require("../../middlewares/userMiddleware"));

var router = _express["default"].Router();

router.use(appMiddleware.protectedRoute);
router.route("/me").patch(userController.getMe);
router.route("/update-me").patch(userController.updateMe);
router.route("/delete-me").patch(userController.deleteMe);
router.use(userMiddleware.restrictTo("admin"));
router.route("/").get(userController.getUsers).post(userController.createUser);
router.route("/:userId").get(userController.getUser).patch(userController.updateUser)["delete"](userController.deleteUser);
var _default = router;
exports["default"] = _default;