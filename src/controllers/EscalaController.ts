import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { Disponibilidade, Usuario } from "../entities";

type Escala = {
    dia: number;
    horario: number;
    local: string;
    TN: boolean;
    quantidadeMC: number;
    quantidadeCoroinha: number;
};

class EscalaController {
    public async criarEscala(req: Request, res: Response): Promise<Response> {
        try {
            const { porQuemComeçarMC, porQuemComeçarCoroinha, missas } = req.body;
            
            if (!missas || !Array.isArray(missas)) {
                return res.status(400).json({ message: "O campo 'missas' deve ser um array válido." });
            }

            const usuarioRep = AppDataSource.getRepository(Usuario);
            const disponibilidadeRep = AppDataSource.getRepository(Disponibilidade);

            const escalas: Escala[] = missas;

            return res.status(201).json({ message: "Escala criada com sucesso!" });

        } catch (err) {
            return res.status(500).json({ message: "Erro interno ao criar a escala." });
        }
    }
}

export default new EscalaController();

