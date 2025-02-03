import cors = require("cors");
import { Router, Request, Response } from "express";
import usuario from './usuarioRoute'
import disponibilidade from "./disponibilidadeRoute"
import escala from './escalaRoute'

const routes = Router();

routes.use(cors());

routes.use("/usuario", usuario)
routes.use("/disponibilidade", disponibilidade)
routes.use("/escala", escala)

routes.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Requisição desconhecida" });
});


export default routes;