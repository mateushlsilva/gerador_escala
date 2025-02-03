import { Router } from "express";
import { EscalaController } from "../controllers";
import { asyncHandler } from "../middlewares";
const routes = Router();


routes.post("/criar", asyncHandler(EscalaController.criarEscala));


export default routes;