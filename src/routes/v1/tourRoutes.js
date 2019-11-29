import express from "express";
import * as tourController from "../../controllers/tourController";
import * as appMiddleware from "../../middlewares/appMiddleware";
import * as tourMiddleware from "../../middlewares/tourMiddlewares";
import * as userMiddleware from "../../middlewares/userMiddleware";
import reviewRoutes from "./reviewRoutes";

const router = express.Router();

router.use("/:tourId/reviews", reviewRoutes);

router.route("/tour-stats").get(tourController.getTourStats);
router
  .route("/monthly-plan/:year")
  .get(
    appMiddleware.protectedRoute,
    userMiddleware.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlan
  );

router
  .route("/top-5-cheap")
  .get(tourMiddleware.aliasTopCheapTour, tourController.getTours);

router
  .route("/")
  .get(tourController.getTours)
  .post(
    appMiddleware.protectedRoute,
    userMiddleware.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );

router
  .route("/:tourId")
  .get(tourController.getTour)
  .patch(
    appMiddleware.protectedRoute,
    userMiddleware.restrictTo("admin", "lead-guide"),
    tourController.updateTour
  )
  .delete(
    appMiddleware.protectedRoute,
    userMiddleware.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

export default router;
