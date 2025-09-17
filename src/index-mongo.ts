import 'dotenv/config';
import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { stringify } from 'querystring';

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db(process.env.MONGO_DB!);

await client.connect();

const app = express();
app.use(express.json());

app.get('/produtos', async (req: Request, res: Response) => {

    const produtos = await db.collection('produtos').find().toArray();
    res.send(produtos);

});
app.post('/produtos', async (req: Request, res: Response) => {
    const {nome, preco,urlfoto, descricao,} = req.body;
    if (!nome || !preco || !urlfoto || !descricao) {
    //return res.status(400).send("nome, preco, urlfoto e descricao sao obrigatorios")
    throw new Error("nome, preco, urlfoto e descricao sao obrigatorios")
    }
    const produto = {nome, preco,urlfoto, descricao,}
    const resultado = await db.collection('produtos').insertOne(produto)
    res.status(201).json({"nome,preco,urlfoto,descricao,_id:resultado.insertedId"});
       
    });
app.listen(8000, () => {
    console.log('Server Iniciado, porta: 8000')
});