import express from "express";
import * as userController from "../../controllers/userController";
import * as appMiddleware from "../../middlewares/appMiddleware";
import * as userMiddleware from "../../middlewares/userMiddleware";

const router = express.Router();

router.use(appMiddleware.protectedRoute);

router.route("/me").patch(userController.getMe);

router.route("/update-me").patch(userController.updateMe);

router.route("/delete-me").patch(userController.deleteMe);

router.use(userMiddleware.restrictTo("admin"));

router
  .route("/")
  .get(userController.getUsers)
  .post(userController.createUser);

router
  .route("/:userId")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
