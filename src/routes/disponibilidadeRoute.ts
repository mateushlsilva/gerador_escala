import { Router } from "express";
import { DisponibilidadeController } from "../controllers";
import { asyncHandler } from "../middlewares";
const routes = Router();


routes.get("/all", asyncHandler(DisponibilidadeController.getAll));
routes.get("/oneBy/:uuid", asyncHandler(DisponibilidadeController.getOne));
routes.post("/create", asyncHandler(DisponibilidadeController.post));
routes.put("/put/:uuid", asyncHandler(DisponibilidadeController.put));
routes.put("/patch/", asyncHandler(DisponibilidadeController.patch));
routes.delete("/delete/:uuid", asyncHandler(DisponibilidadeController.delete));


export default routes;