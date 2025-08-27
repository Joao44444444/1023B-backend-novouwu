import express from 'express'
import mysql from 'mysql2/promise'
import 'dotenv/config'



const app = express()
app.get('/', async (req, res) => {
    if(process.env.DBHOST == undefined){
        res.status(500).send('DBHOST não esta definido nas variaveis de ambiente')
        return 
    } 
    if(process.env.DBUSER == undefined){
        res.status(500).send('DBUSER não esta definido nas variaveis de ambiente')
        return 
    }
    if(process.env.DBPASSWORD == undefined){
        res.status(500).send('DBPASSWORD não esta definido nas variaveis de ambiente')
        return 
    }
    if(process.env.DBDATABASE == undefined){
        res.status(500).send('DBDATABASE não esta definido nas variaveis de ambiente')
        return 
    }
    if(process.env.DBPORT == undefined){
        res.status(500).send('DBPORT não esta definido nas variaveis de ambiente')
        return 
    }
    try {
    const connection = await mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBDATABASE,
        port: Number(process.env.DBPORT)
    })
    res.send("conectado ao banco de dados com sucesso!!!!!!!!!!!!")
}
 catch (err){
    if(err instanceof Error == false){
    res.status(500).send('Erro  desconhecido ao conectar ao banco de dados')
    return
}
const erro = err as Error
    res.status(500).send('Erro ao conectar ao banco de dados' + erro.message)
}


