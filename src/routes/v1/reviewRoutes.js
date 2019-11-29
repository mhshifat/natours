import express from "express";
import * as reviewController from "../../controllers/reviewController";
import * as appMiddleware from "../../middlewares/appMiddleware";
import * as userMiddleware from "../../middlewares/userMiddleware";

const router = express.Router({ mergeParams: true });

router.use(appMiddleware.protectedRoute);

router
  .route("/")
  .get(reviewController.getReviews)
  .post(
    appMiddleware.protectedRoute,
    userMiddleware.restrictTo("user"),
    reviewController.createReview
  );

router
  .route("/:reviewId")
  .get(reviewController.getReview)
  .patch(
    userMiddleware.restrictTo("user", "admin"),
    reviewController.updateReview
  )
  .delete(
    userMiddleware.restrictTo("user", "admin"),
    reviewController.deleteReview
  );

export default router;
