import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Usuario } from '../entities';
import { generateToken } from '../middlewares';

enum UserType {
  ADM = 0,
  MC = 1,
  COROINHA = 2
}
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
        const rep = AppDataSource.getRepository(Usuario)
        const { userEmail, userPassword, userTN, userType, userName, admin } = req.body
        const novoUsuario = new Usuario()
        if (userType === UserType.ADM) {
          novoUsuario.userEmail = userEmail
          novoUsuario.userPassword = userPassword 
        }
        novoUsuario.userTN = userTN
        novoUsuario.userName = userName
        novoUsuario.admin = admin
        novoUsuario.userType = userType
        const save = await rep.save(novoUsuario)
        return res.status(200).json({erro: false, menssagem: "Usuario criado!", usuario: save})
    }catch(err){
      console.log(err);
      
        return res.status(400).json({erro: true, menssagem: "Erro ao criar!"})
    } 
  }

  public async putUser(req: Request, res: Response): Promise<Response> {
    try{
      const rep = AppDataSource.getRepository(Usuario)
      const idUsuario: any = req.params.uuid
      const { userEmail, userPassword, userTN, userType, userName, admin } = req.body
      const findUsuario = await rep.findOneBy({ id: idUsuario })
      if (userType === UserType.ADM) {
        findUsuario.userEmail = userEmail
        findUsuario.userPassword = userPassword 
      }
      findUsuario.userTN = userTN
      findUsuario.userName = userName
      findUsuario.admin = admin
      findUsuario.userType = userType
      const save = await rep.save(findUsuario)
      return res.status(200).json({erro: false, menssagem: "Usuario criado!", usuario: save})
    }catch(err){
      console.log(err);
        return res.status(400).json({erro: true, menssagem: "Erro ao mudar a senha!"})
    }
  }



  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try{
      const idUser: any = req.params.uuid
      const userRepository = AppDataSource.getRepository(Usuario)
      const findUser = await userRepository.findOneBy({ id: idUser })
      const allUser = await userRepository.remove(findUser)
      return res.status(200).json({erro: false, menssagem: "Usuario deletado!", usuario: allUser})
    }catch(err){
        return res.status(400).json({erro: true, menssagem: "Erro ao deletar!"})
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