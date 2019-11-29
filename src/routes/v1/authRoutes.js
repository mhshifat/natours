import express from "express";
import * as authController from "../../controllers/authController";
import * as appMiddleware from "../../middlewares/appMiddleware";

const router = express.Router();

router.route("/login").post(authController.loginUser);
router.route("/register").post(authController.registerUser);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password/:token").patch(authController.resetPassword);
router
  .route("/update-password")
  .patch(appMiddleware.protectedRoute, authController.updateMyPassword);
router.route("/logout").get(authController.logout);

export default router;
