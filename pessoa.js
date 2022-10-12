const {queryDB, connection} = require("./connection");

const express = require('express');
const excelJS = require("exceljs");

const router = express.Router();

//Verificar todos os atores
router.get('/atores', async function (req, res) {
    console.log(connection.state);
    let atores = await queryDB("SELECT pessoa.idpessoa, pessoa.nome, pessoa.datanascimento, pessoa.genero FROM `ator`, `pessoa` WHERE ator.idpessoa = pessoa.idpessoa GROUP BY ator.idpessoa ORDER BY pessoa.nome ASC;");

    res.json(atores);
});

//Verificar todos os realizadores
router.get('/realizadores', async function (req, res) {
    console.log(connection.state);
    let realizadores = await queryDB("SELECT pessoa.idpessoa, pessoa.nome, pessoa.datanascimento, pessoa.genero FROM `realizador`, `pessoa` WHERE realizador.idpessoa = pessoa.idpessoa GROUP BY realizador.idpessoa ORDER BY pessoa.nome ASC;");
    res.json(realizadores);
});

//Pesquisar um ator pelo ID
router.get('/pesquisar/:idPessoa', async function (req, res) {
    console.log(connection.state);
    try {
        let pessoa = await queryDB("SELECT pessoa.idpessoa, nome, datanascimento, genero, CASE WHEN ator.idpessoa is not null THEN \"Ator\" when realizador.idpessoa is not null then \"Realizador\" ELSE \"Pessoa\" END as tipo FROM `pessoa` left JOIN ator on ator.idpessoa=pessoa.idpessoa left join realizador on realizador.idpessoa=pessoa.idpessoa WHERE pessoa.idpessoa = ? GROUP BY pessoa.idpessoa", [req.params.idPessoa]);
        if (pessoa.length > 0) {
            console.log(req.params.idPessoa)
            res.json(pessoa[0]);
        } else {
            throw 'Ator Inválido'
        }
    } catch (e) {
        res.json(e)
    }
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

        await queryDB("INSERT INTO ator SET ?", {
            idpessoa: resultado.insertId,
        });

        let atorAdicionado = await queryDB("SELECT * FROM pessoa WHERE pessoa.idpessoa = ?", [resultado.insertId]);
        res.json(atorAdicionado[0]);
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

        await queryDB("INSERT INTO realizador SET ?", {
            idpessoa: resultado.insertId,
        });

        let realizadorAdicionado = await queryDB("SELECT * FROM pessoa WHERE pessoa.idpessoa = ?", [resultado.insertId]);
        res.json(realizadorAdicionado[0]);
    }
})

//Apagar uma pessoa
router.post('/:idPessoa/apagar', async function (req, res) {
    console.log(req.body);
    let pessoa = await queryDB("SELECT * FROM `pessoa` WHERE pessoa.idPessoa  = ?", [req.params.idPessoa]);

    if (pessoa.length > 0) {
        await queryDB("DELETE FROM pessoa where idpessoa = ?", [req.params.idPessoa])
        res.json('Pessoa apagada com sucesso!')
    } else {
        res.json('Pessoa não encontrada.')
    }
})

//Editar Ator
router.post('/:idAtor/editar/ator', async function (req, res) {
    let ator = await queryDB("SELECT * FROM ator WHERE ator.idpessoa =?", [req.params.idAtor]);

    if(ator.length > 0){
        await queryDB("UPDATE ator SET idfilme = ? WHERE ator.idpessoa =?",[req.body.idfilme, req.params.idAtor])
        let atorAtualizado = await queryDB("SELECT * FROM ator WHERE ator.idpessoa =?", [req.params.idAtor]);
        res.json(atorAtualizado);
    }else{
        res.json('Esta pessoa não é um ator')
    }
})

//Editar Realizador
router.post('/:idRealizador/editar/realizador', async function (req, res) {
    let realizador = await queryDB("SELECT * FROM realizador WHERE realizador.idpessoa =?", [req.params.idRealizador]);

    if(realizador.length > 0){
        await queryDB("UPDATE realizador SET idfilme = ? WHERE realizador.idpessoa =?",[req.body.idfilme, req.params.idRealizador])
        res.json(realizador);
    }else{
        res.json('Esta pessoa não é um realizador')
    }
})

//Consultar nº de filmes de pessoa

//SELECT pessoa.idpessoa, nome, CASE WHEN ator.idpessoa is not null THEN "Ator" ELSE "Realizador" END as tipo, filme.titulo AS aparições
// FROM `pessoa`
// left JOIN ator on ator.idpessoa=pessoa.idpessoa
// left join realizador on realizador.idpessoa=pessoa.idpessoa
// LEFT JOIN filme on filme.idfilme = realizador.idfilme
// GROUP BY pessoa.idpessoa

router.get('/ator/consultar/:idAtor', async function (req, res) {
    let ator = await queryDB("SELECT * FROM ator WHERE ator.idpessoa =?", [req.params.idAtor]);

    if(ator.length > 0){
        let resultado = await queryDB("SELECT pessoa.nome, Count(*) AS Filmes FROM `ator`, pessoa, filme WHERE ator.idpessoa = pessoa.idpessoa AND ator.idfilme = filme.idfilme AND pessoa.idpessoa = ? GROUP BY ator.idpessoa", [req.params.idAtor])
        res.json(resultado);
    }else{
        res.json('Esta pessoa não é um ator')
    }
})

//Consultar nº de filmes de realizador
router.get('/realizador/consultar/:idRealizador', async function (req, res) {
    let realizador = await queryDB("SELECT * FROM realizador WHERE realizador.idpessoa =?", [req.params.idRealizador]);

    if(realizador.length > 0){
        let resultado = await queryDB("SELECT pessoa.nome, Count(*) AS Filmes FROM `realizador`, pessoa, filme WHERE realizador.idpessoa = pessoa.idpessoa AND realizador.idfilme = filme.idfilme AND pessoa.idpessoa = ? GROUP BY realizador.idpessoa", [req.params.idRealizador])
        res.json(resultado);
    }else{
        res.json('Esta pessoa não é um realizador')
    }
})

//Excel
router.get('/excel', async function (req, res) {
    let pessoas = await queryDB("SELECT nome, datanascimento, genero, CASE WHEN ator.idpessoa is not null THEN \"Ator\" when realizador.idpessoa is not null then \"Realizador\" ELSE \"Pessoa\" END as tipo FROM `pessoa` left JOIN ator on ator.idpessoa=pessoa.idpessoa left join realizador on realizador.idpessoa=pessoa.idpessoa GROUP BY pessoa.idpessoa;\n");

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('pessoas');
    let colunas = [];
    for (let i in pessoas[0]) {
        if (pessoas[0].hasOwnProperty(i)) {
            colunas.push(i);
        }
    }
    let cabecalho = [];
    colunas.forEach((coluna) => {
        cabecalho.push({header: coluna, key: coluna});
    })
    worksheet.columns = cabecalho;
    pessoas.forEach((dados) => {
        worksheet.addRow(dados);
    })

    let excel = await workbook.xlsx.writeBuffer();
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=pessoas.xlsx");
    res.send(excel);
});

module.exports = router;