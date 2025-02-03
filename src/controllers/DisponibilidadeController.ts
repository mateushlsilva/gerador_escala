import AppDataSource from "../data-source"
import { Request, Response } from 'express';
import { Disponibilidade } from "../entities";

class DisponibilidadeController {

    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            
        } catch (err) {
            return res.status(400).json({ mensage: "Erro ao pegar as disponibilidades" })
        }
    }
    public async getOne(req: Request, res: Response): Promise<Response> {
        try {
            
        } catch (err) {
            return res.status(400).json({ mensage: "Erro ao pegar a disponibilidade" })
        }
    }

    public async post(req: Request, res: Response): Promise<Response> {
        try {

        } catch (err) {
            return res.status(400).json({ mensage: "Erro ao cadastrar a disponibilidade" })
        }
    }

    public async put(req: Request, res: Response): Promise<Response> {
        try {
           
        } catch (err) {
            return res.status(400).json({ mensage: "Erro ao editar a disponibilidade" })
        }
    }

    public async patch(req:Request, res: Response): Promise<Response>{
        try{
           
        }catch(err){
            return res.status(400).json({erro: "Erro ao alterar a disponibilidade"})
        }
    }
    
    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            
        } catch (err) {
            return res.status(400).json({ mensage: "Erro ao deletar a disponibilidade" })
        }
    }

 

}
export default new DisponibilidadeController();
