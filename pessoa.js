const {queryDB, connection} = require("./connection");

const express = require('express');
const app = express();

const router = express.Router();

//Verificar todos os atores
app.get('/atores', async function (req, res) {
    console.log(connection.state);
    let atores = await queryDB("SELECT pessoa.nome, pessoa.datanascimento, pessoa.genero FROM `ator`, `pessoa` WHERE ator.idpessoa = pessoa.idpessoa GROUP BY ator.idpessoa ORDER BY pessoa.nome ASC;");
    res.json(atores);
});

//Verificar todos os realizadores
app.get('/realizadores', async function (req, res) {
    console.log(connection.state);
    let atores = await queryDB("SELECT pessoa.nome, pessoa.datanascimento, pessoa.genero FROM `realizador`, `pessoa` WHERE realizador.idpessoa = pessoa.idpessoa GROUP BY realizador.idpessoa ORDER BY pessoa.nome ASC;");
    res.json(atores);
});

//Pesquisar um ator pelo ID
    app.get('/atores/:idAutor', async function (req, res) {
        console.log(connection.state);
        // Procurar ator com o mesmo ID
        let atores = await queryDB("SELECT pessoa.nome, pessoa.datanascimento, pessoa.genero  FROM `ator`, `pessoa` WHERE ator.idpessoa = pessoa.idpessoa AND pessoa.idpessoa = ?", [req.params.idAutor]);
        if (atores.length > 0) {
            console.log(req.params.idAutor)
            res.json(atores);
        }
    })


//Pesquisar um realizador pelo o nome ou ID
//Adicionar um ator
//Adicionar um realizador
//Remover um ator
//Remover um realizador

app.listen(3000);
module.exports = router;
