const {queryDB, connection} = require("./connection");

const express = require('express');

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
router.get('/atores/:idAutor', async function (req, res) {
    console.log(connection.state);
    // Procurar ator com o mesmo ID
    try {
        let atores = await queryDB("SELECT pessoa.nome, pessoa.datanascimento, pessoa.genero  FROM `ator`, `pessoa` WHERE ator.idpessoa = pessoa.idpessoa AND pessoa.idpessoa = ?", [req.params.idAutor]);
        if (atores.length > 0) {
            console.log(req.params.idAutor)
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

//Adicionar um ator
router.post('/ator/criar', async function (req, res) {
    console.log(req.body);
    let ator = await queryDB("SELECT * FROM pessoa WHERE nome = ?", [req.body.nome]);

    if (ator.length > 0) {
        res.status(400).send("Já existe um ator com esse nome");
        return;
    }

    //Adicionar ator em pessoa
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
})

//Adicionar um realizador (falta testar/adicionar realizador)
router.post('/realizador/criar', async function (req, res) {
    console.log(req.body);
    let realizador = await queryDB("SELECT * FROM pessoa WHERE nome = ?", [req.body.nome]);

    if (realizador.length > 0) {
        res.status(400).send("Já existe um realizador com esse nome");
        return;
    }

    let resultado = await queryDB("INSERT INTO pessoa SET ?", {
        nome: req.body.nome,
        datanascimento: req.body.datanascimento,
        genero: req.body.genero
    });
    console.log(resultado.insertId)

    let realizadorAdicionado = await queryDB("SELECT * FROM pessoa WHERE pessoa.idpessoa = ?", [resultado.insertId]);
    res.json(realizadorAdicionador);
})

//Remover um ator
//Remover um realizador

module.exports = router;
