import AppDataSource from "../data-source"
import { Request, Response } from 'express';
import { Disponibilidade, Usuario } from "../entities";

class EscalaController {

    public async criarEscala(req: Request, res: Response): Promise<Response> {
        try {
            
        } catch (err) {
            return res.status(400).json({ mensage: "Erro ao criar" })
        }
    }

 

}
export default new EscalaController();
