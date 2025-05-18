import express from "express";

import * as controllers from "../controllers/sellersControllers.js";

const router = express.Router();

//LIST USERS
router.get("/sellers", controllers.sellers);
router.put("/sellersInactive", controllers.sellersInactiveController);

export default router;
