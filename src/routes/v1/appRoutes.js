import express from "express";
import * as appController from "../../controllers/appController";

const router = express.Router();

router.route("*").all(appController.global404Route);

export default router;
