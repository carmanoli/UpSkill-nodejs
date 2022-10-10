const {queryDB, connection} = require("./connection");

const express = require('express');
const {json} = require("express");

const router = express.Router();

//Verificar todos os atores
router.get('/atores', async function (req, res) {
    console.log(connection.state);
    let atores = await queryDB("SELECT pessoa.nome, pessoa.datanascimento, pessoa.genero FROM `ator`, `pessoa` WHERE ator.idpessoa = pessoa.idpessoa GROUP BY ator.idpessoa ORDER BY pessoa.nome ASC;");
    res.json(atores);
});

//Verificar todos os realizadores
router.get('/realizadores', async function (req, res) {
    console.log(connection.state);
    let realizadores = await queryDB("SELECT pessoa.nome, pessoa.datanascimento, pessoa.genero FROM `realizador`, `pessoa` WHERE realizador.idpessoa = pessoa.idpessoa GROUP BY realizador.idpessoa ORDER BY pessoa.nome ASC;");
    res.json(realizadores);
});

//Pesquisar um ator pelo ID
router.get('/atores/:idAtor', async function (req, res) {
    console.log(connection.state);
    // Procurar ator com o mesmo ID
    try {
        let atores = await queryDB("SELECT pessoa.nome, pessoa.datanascimento, pessoa.genero  FROM `ator`, `pessoa` WHERE ator.idpessoa = pessoa.idpessoa AND pessoa.idpessoa = ?", [req.params.idAtor]);
        if (atores.length > 0) {
            console.log(req.params.idAtor)
            res.json(atores);
        } else {
            throw 'Ator Inválido'
        }
    } catch (e) {
        res.json(e)
    }
})

//Pesquisar um realizador pelo o nome ou ID
router.get('/realizadores/:idRealizador', async function (req, res) {
    console.log(connection.state);
    // Procurar ator com o mesmo ID
    try {
        let realizador = await queryDB("SELECT pessoa.nome, pessoa.datanascimento, pessoa.genero  FROM `realizador`, `pessoa` WHERE realizador.idpessoa = pessoa.idpessoa AND pessoa.idpessoa = ?", [req.params.idRealizador]);
        if (realizador.length > 0) {
            console.log(req.params.idRealizador)
            res.json(realizador);
        } else {
            throw 'Realizador Invalido'
        }
    } catch (e) {
        res.json(e)
    }
})

//Adicionar pessoa
router.post('/criar', async function (req, res) {
    console.log(req.body);
    let pessoa = await queryDB("SELECT * FROM pessoa WHERE nome = ?", [req.body.nome]);

    if (pessoa.length > 0) {
        res.status(400).send("Já existe uma pessoa com esse nome");
        return;
    }

    //Adicionar pessoa
    let resultado = await queryDB("INSERT INTO pessoa SET ?", {
        nome: req.body.nome,
        datanascimento: req.body.datanascimento,
        genero: req.body.genero
    });

    let pessoaAdicionada = await queryDB("SELECT * FROM pessoa WHERE pessoa.idpessoa = ?", [resultado.insertId]);
    res.json(pessoaAdicionada);
})

//Adicionar um ator
router.post('/ator/criar', async function (req, res) {
    console.log(req.body);
    let pessoa = await queryDB("SELECT * FROM pessoa WHERE nome = ?", [req.body.nome]);
    if (pessoa.length > 0) {
        res.status(400).send("Já existe uma pessoa com esse nome");
    } else {
        let resultado = await queryDB("INSERT INTO pessoa SET ?", {
            nome: req.body.nome,
            datanascimento: req.body.datanascimento,
            genero: req.body.genero
        });
        console.log(resultado.insertId)

        //Adicionar ator em ator
        await queryDB("INSERT INTO ator SET ?", {
            idpessoa: resultado.insertId,
        });

        let atorAdicionado = await queryDB("SELECT * FROM pessoa WHERE pessoa.idpessoa = ?", [resultado.insertId]);
        res.json(atorAdicionado);
    }
})

//Adicionar um realizador
router.post('/realizador/criar', async function (req, res) {
    console.log(req.body);
    let pessoa = await queryDB("SELECT * FROM pessoa WHERE nome = ?", [req.body.nome]);
    if (pessoa.length > 0) {
        res.status(400).send("Já existe uma pessoa com esse nome");
    } else {
        let resultado = await queryDB("INSERT INTO pessoa SET ?", {
            nome: req.body.nome,
            datanascimento: req.body.datanascimento,
            genero: req.body.genero
        });
        console.log(resultado.insertId)

        //Adicionar ator em ator
        await queryDB("INSERT INTO realizador SET ?", {
            idpessoa: resultado.insertId,
        });

        let realizadorAdicionado = await queryDB("SELECT * FROM pessoa WHERE pessoa.idpessoa = ?", [resultado.insertId]);
        res.json(realizadorAdicionado);
    }
})

//Remover uma pessoa (BUG)
router.post('/:idPessoa/apagar', async function (req, res) {
    console.log(req.body);
    const pessoaApagada = 'Pessoa apagada com sucesso!';
    const pessoaNaoApagada = 'Pessoa Inválida para ser apagada.'
    let pessoa = await queryDB("SELECT *  FROM `pessoa` WHERE pessoa.idpessoa = ?", [req.params.idPessoa]);
    if (pessoa.length > 0) {
        await queryDB("DELETE FROM pessoa where idpessoa = ?", [req.params.idPessoa])
        json(pessoaApagada)
    } else {
        json(pessoaNaoApagada)
    }
})

//Editar pessoa
//Consultar nº de filmes de ator
//Consultar nº de filmes de realizador
//Excel

module.exports = router;
