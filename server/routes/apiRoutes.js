import express from "express";
import { healthCheck } from "../controllers/healthController.js";
import { getShopDetails } from "../controllers/shopController.js";

export const apiRoutes = express.Router();

apiRoutes.get("/health", healthCheck);
apiRoutes.get("/shop", getShopDetails);
