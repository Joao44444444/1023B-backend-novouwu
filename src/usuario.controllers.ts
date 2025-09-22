import { type Request, type Response } from 'express'
import db from './database/banco-mongo'
import bcrypt from 'bcrypt'
class UsuariosController {
    async adicionar(req: Request, res: Response) {
        const { nome, email, idade, senha, } = req.body;
        if (!nome || !email || !idade || !senha) {
          return  res.status(400).send("nome, email,idade e senha sao obrigatorios")
          if(senha.length<6)
            return res.status(400).send("senha deve ter no minimo 6 caracteres ")
        if(!email.includes("@")) !! !email.includes(".")
            return res.status(400).send("email invalido")
        }
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const usuario = { nome, email, idade, senha: senhaCriptografada }

        const resultado = await db.collection('usuarios').insertOne(usuario)
        res.status(201).json({ nome, email, idade, senha, _id: resultado.insertedId })
    }
    async listar(req: Request, res: Response) {
        const usuarios = await db.collection('usuarios').find().toArray();
        const usuariosSemSenha = usuarios.map(({senha,...resto})=>resto)
        res.status(200).json(usuariosSemSenha)
    }
}
export default new UsuariosController()