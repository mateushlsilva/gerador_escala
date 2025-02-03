import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Usuario } from '../entities';
import { generateToken } from '../middlewares';

class UsuarioController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { userEmail, userPassword } = req.body;
    //verifica se foram fornecidos os parâmetros
    if (!userEmail || !userPassword || userEmail.trim() === "" || userPassword.trim() === "") {
      return res.json({ error: "e-userEmail e senha necessários" });
    }
    // como a propriedade userPassword não está disponível para select {select: false},
    // então precisamos usar esta conulta para forçar incluir a propriedade 
    const usuario: any = await AppDataSource
      .getRepository(Usuario)
      .createQueryBuilder("user")
      .select()
      .addSelect('user.userPassword')
      .where("user.userEmail=:userEmail", { userEmail })
      .getOne();

    if (usuario && usuario.id) {
      console.log(usuario)
      const r = await usuario.compare(userPassword);
      console.log(r)
      if (r) {
        // cria um token codificando o objeto {id,userEmail}
        const token = await generateToken({ id: usuario.id, userEmail: usuario.userEmail });
        // retorna o token para o cliente
        return res.json({
          id: usuario.id,
          userEmail: usuario.userEmail,
          token
        });
      }
      return res.status(400).json({ error: "Dados de login não conferem" });
    }
    else {
      return res.status(400).json({ error: "Usuário não localizado" });
    }
  }



  public async getAll(req: Request, res: Response): Promise<Response> {
    try{
        const userRepository = AppDataSource.getRepository(Usuario)
        const allUser = await userRepository.find()
        return res.json(allUser)
    }catch(err){
        return res.status(400).json({erro: true, menssagem: "Erro ao mudar buscar os usuarios!"})
    }
  }

  public async getUserId(req: Request, res: Response): Promise<Response> {
    try{
        const idUser: any = req.params.uuid
        const userRepository = AppDataSource.getRepository(Usuario)
        const allUser = await userRepository.findOneBy({ id: idUser })
        return res.json(allUser)
    }catch(err){
        return res.status(400).json({erro: true, menssagem: "Erro ao mudar a senha!"})
    }
  }



  public async postUser(req: Request, res: Response): Promise<Response> {
    try{

    }catch(err){
        return res.status(400).json({erro: true, menssagem: "Erro ao mudar a senha!"})
    }
   
  }

  public async putUser(req: Request, res: Response): Promise<Response> {
    try{

    }catch(err){
        return res.status(400).json({erro: true, menssagem: "Erro ao mudar a senha!"})
    }
  }



  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try{

    }catch(err){
        return res.status(400).json({erro: true, menssagem: "Erro ao mudar a senha!"})
    }
  }

  public async putPassword(req: Request, res: Response): Promise<Response> {
    try{
        const { userPassword, userEmail } = req.body
        const usuario: any = await AppDataSource.manager
          .getRepository(Usuario)
          .createQueryBuilder("user")
          .select()
          .addSelect('user.userPassword')
          .where("user.userEmail=:userEmail", { userEmail })
          .getOne();
        console.log(usuario);
        // const userRepository = AppDataSource.getRepository(User)
        // const findUser = await userRepository.findOneBy({ id: idUser })
        usuario.userPassword = userPassword
    
        // const allUser = await usuario.save(usuario)
        const r = await AppDataSource.manager.save(Usuario, usuario)
        return res.json(r)
    }catch(err){
        return res.status(400).json({erro: true, menssagem: "Erro ao mudar a senha!"})
    }
  }
}

export default new UsuarioController();