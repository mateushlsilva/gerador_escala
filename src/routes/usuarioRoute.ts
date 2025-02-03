import { Router } from "express";
import { UsuarioController } from "../controllers";
import { asyncHandler } from "../middlewares";
const routes = Router();


routes.post("/login", asyncHandler(UsuarioController.login));
routes.get("/all", asyncHandler(UsuarioController.getAll));
routes.get("/oneBy/:uuid", asyncHandler(UsuarioController.getUserId));
routes.post("/create", asyncHandler(UsuarioController.postUser));
routes.put("/put/:uuid", asyncHandler(UsuarioController.putUser));
routes.put("/putpass/", asyncHandler(UsuarioController.putPassword));
routes.delete("/delete/:uuid", asyncHandler(UsuarioController.deleteUser));


export default routes;