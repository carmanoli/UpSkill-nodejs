const express = require('express');
const app = express();
const {queryDB} = require("./connection.js");
const {connection} = require("./connection");
const router = express.Router();

// listar utilizadores existentes
app.listen(3000);
app.get('/utilizador', async function (req, res) {
    let utilizador = await queryDB("SELECT * FROM utilizador");
    res.json(utilizador);
})

// listar visualizações de utilizadores
app.get('/visualizacao', async function (req, res) {
    let visualizacao = await queryDB("SELECT * FROM visualizacao");
    res.json(visualizacao);
})
// listar pontuação de utilizadores
app.get('/pontuacao', async function (req, res) {
    let pontuacao = await queryDB("SELECT * FROM pontuacao");
    res.json(pontuacao);
})

// listar a lista de utilizador
app.get('/utilizador/lista', async function (req, res) {
    let utilizadorlista = await queryDB("SELECT nome, email, password, pontuacao, comentario, datahora FROM utilizador, pontuacao, visualizacao WHERE utilizador.idutilizador = pontuacao.idutilizador AND utilizador.idutilizador = visualizacao.idutilizador");
    res.json(utilizadorlista);
})

module.exports = router;
