import express from "express";
import * as viewController from "../../controllers/viewController";
import * as appMiddleware from "../../middlewares/appMiddleware";

const router = express.Router();

router.use(appMiddleware.isLoggedIn);

router.get("/", viewController.renderOverview);
router.get("/tours/:slug", viewController.renderTour);
router.get("/login", viewController.renderLogin);

export default router;
