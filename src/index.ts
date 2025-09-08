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
const erro = (err as Error)
    res.status(500).send('Erro ao conectar ao banco de dados' + erro.message)
}
})

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})

// Tarefa: Criar uma rota get para produtos que retorne a lista de produtos do banco de dados
// produto deve ter id, nome, preco, urlfoto, descricao
// Deve-se criar uma tabela no banco de dados AIVEN para armazenar os produtos
// A resposta deve ser um array de produtos em formato JSON
// Crie o código sql para criar a tabela de produtos
 
//CREATE TABLE produtos (
//    id INT AUTO_INCREMENT PRIMARY KEY,
//    nome VARCHAR(100) NOT NULL,
//    preco DECIMAL(10, 2) NOT NULL,
//    urlfoto VARCHAR(255) NOT NULL,
//    descricao TEXT
//);
//Faz pelo menos 3 inserções nessa tabela 

//use"defaultdb";
//CREATE TABLE produtos (
//    id INT AUTO_INCREMENT PRIMARY KEY,
//    nome VARCHAR(100) NOT NULL,
//    preco DECIMAL(10, 2) NOT NULL,
//    urlfoto VARCHAR(255) NOT NULL,
//    descricao TEXT
//);
 
// INSERT INTO produtos (id,nome,preco,urlfoto,descricao)
//VALUES ("arroz", '23','https://placehold.co/600x400', 'alimento do dia a dia'),
// ("camera", '18.90','https://placehold.co/600x400', 'utensilio para fotografar '),
//("cadeira", '120','https://placehold.co/600x400', 'utensilio para sentar para relaxar'),
//("processador ryzen 7 770gt", '1.900','https://placehold.co/600x400', 'processador para colocar em computador'),
//("garfo", '70','https://placehold.co/600x400', 'usado para pegar alimentos com facilidade');
