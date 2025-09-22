import express from 'express'
import 'dotenv/config
import rotas from './rotas'


const app = express();
app.use(express.json());

       
app.listen(8000, () => {
    console.log('Server Iniciado, porta: 8000')
});