import {Router} from "express"

import CarrinhoController from "./carrinho/carrinho.controller"
import ProdutoController from "./pedidos/produtos.controllers"

const rotas = Router()

//rotas do carrinho
rotas.get('/carrinho',CarrinhoController.listar)
rotas.post('/carrinho',CarrinhoController.adicionar)

//rotas do produto
rotas.get('/produto',ProdutoController.listar)
rotas.post('/produto',ProdutoController.adicionar)
export default rotas