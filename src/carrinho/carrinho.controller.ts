import { type Request, type Response } from 'express'
import db from '../database/banco-mongo'
class CarrinhoController {
    async adicionar(req: Request, res: Response) {
        const { nome, preco, urlfoto, descricao, } = req.body;
        if (!nome || !preco || !urlfoto || !descricao) {
            res.status(400).send("nome, preco, urlfoto e descricao sao obrigatorios")
        }
        const produto = { nome, preco, urlfoto, descricao, }
        const resultado = await db.collection('produtos').insertOne(produto)
        res.status(201).json({ nome, preco, urlfoto, descricao, _id: resultado.insertedId })
    }
    async listar(req: Request, res: Response) {
        const produtos = await db.collection('produtos').find().toArray();
        res.status(200).json(produtos)
    }
}
export default new CarrinhoController()