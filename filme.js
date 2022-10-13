const {queryDB, connection} = require("./connection");
const express = require('express');
const router = express.Router();
const ExcelJS = require("exceljs");

router.get('/:filme/detalhe', async function (req, res) {
    try
    {
        let sqlFilter =  ` AND (
            filme.idfilme = ? OR
            filme.titulo LIKE ?
        )` ;

        let filmes = await getFilmes(sqlFilter, [req.params.filme, '%' + req.params.filme + '%']);

        res.status(200).json(filmes[0])
    }
    catch(e){
        res.status(400).json({message: "Erro: " + e})
    }
});

router.get('/filtrar', async function (req, res) {
    try
    {
        let sqlFilter = ""
        let sqlParameter = []

        for (var param in req.query) {
            switch (param) {
                case 'titulo':
                case 'ano':
                    sqlFilter += ` AND ${param} = ? `;
                    sqlParameter.push(req.query[param]);
                    break;
                case 'realizador':
                    sqlFilter += ` AND pessoarealizador.nome = ? `;
                    sqlParameter.push(req.query[param]);
                    break;
                case 'ator':
                    sqlFilter += ` AND pessoaator.nome = ? `;
                    sqlParameter.push(req.query[param]);
                    break;
                case 'genero':
                    sqlFilter += ` AND genero.nome = ? `;
                    sqlParameter.push(req.query[param]);
                    break;

            }
        }

        filmes = await getFilmes(sqlFilter, sqlParameter);

        res.status(200).json(filmes)
    }
    catch(e){
        res.status(400).json({message: "Erro: " + e})
    }
});

router.get('/listar', async function (req, res) {
    try
    {
        let filmes = await getFilmes();
        res.status(200).json(filmes)
    }
    catch(e){
        res.status(400).json({message: "Erro: " + e})
    }
});

router.get('/excel', async function (req, res) {
    try
    {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Filmes");
        let filmes = await getFilmes();

        worksheet.columns = Object.keys(filmes[0])
            .map(key => ({header: key, key: key}));

        filmes.forEach(
            linha =>
                worksheet.addRow(linha)
        )

        let excel = await workbook.xlsx.writeBuffer();

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=filmes.xlsx");

        res.send(excel);
    }
    catch(e){
        res.status(400).json({message: "Erro: " + e})
    }
})

router.post('/criar',  async function (req, res) {

    try {
        // Verificar se filme já existe
        let filme = await queryDB("SELECT * FROM filme where titulo = ?", [req.body.titulo]);
        if (filme.length > 0)
            throw "Filme já existe!";

        // Verificar se idioma existe
        let idioma = await queryDB("SELECT * FROM idioma where siglaidioma = ?", [req.body.siglaidoma]);
        if (idioma.length === 0)
            throw "Idioma inexistente!";

        if (req.body.hasOwnProperty('genero')) {
            // se forem especificadas generos verificar se existem
            let getGenero = async genero =>{

                let generoFilme = await queryDB("SELECT * FROM genero where nome = ?", [genero]);

                if (generoFilme.length === 0)
                    throw "genero inexistente!";
            }
            // Verificar se os generos existem
            for (let i = 0; i < req.body.genero.length; i++) {
                await getGenero(req.body.genero[i]);
            }
        }

        if (req.body.hasOwnProperty('ator')) {
            // se forem especificadas atores verificar se existem
            let getAtor = async ator =>{
                let atorFilme = await queryDB("SELECT * FROM pessoa where nome = ?", [ator]);

                if (atorFilme.length === 0)
                    throw "ator inexistente!";
            }
            // Verificar se os atores existem
            for (let i = 0; i < req.body.ator.length; i++) {
                await getAtor(req.body.ator[i]);
            }
        }

        if (req.body.hasOwnProperty('realizador')) {
            // se forem especificado realizador verificar se existe(m)
            let getRealizador = async realizador =>{

                let realizadorFilme = await queryDB("SELECT * FROM pessoa where nome = ?", [realizador]);

                if (realizadorFilme.length === 0)
                    throw "realizador inexistente!";
            }
            // Verificar se o(s) realizador existem
            for (let i = 0; i < req.body.realizador.length; i++) {
                await getRealizador(req.body.realizador[i]);
            }
        }

        if (req.body.hasOwnProperty('siglaidioma')) {
            // se forem especificado o idioma verificar se existe
            let siglaidoma = await queryDB("SELECT * FROM idioma where siglaidioma = ?", [req.body.siglaidoma]);
            if (siglaidoma.length === 0)
                throw "Idioma inexistente!";
        }

        filme = await queryDB("INSERT INTO filme SET ?", {
            titulo: req.body.titulo,
            ano: req.body.ano,
            sinopse: req.body.sinopse,
            siglaidoma: req.body.siglaidoma
        })

        // inserir os generos
        if (req.body.hasOwnProperty('genero')) {
            for (let i = 0; i < req.body.genero.length; i++) {
                let genero = await queryDB("SELECT * FROM genero where nome = ?", req.body.genero[i]);
                await queryDB("INSERT INTO filmegenero SET ?", {
                    idfilme: filme.insertId,
                    idgenero: genero[0].idgenero
                })
            }
        }

        // inserir os atores
        if (req.body.hasOwnProperty('ator')) {
            for (let i = 0; i < req.body.ator.length; i++) {

                let ator = await queryDB("SELECT * FROM pessoa where nome = ?", req.body.ator[i]);
                await queryDB("INSERT INTO ator SET ?", {
                    idfilme: filme.insertId,
                    idpessoa: ator[0].idpessoa
                })
            }
        }

        // inserir os realizadores
        if (req.body.hasOwnProperty('realizador')) {
            for (let i = 0; i < req.body.realizador.length; i++) {

                let realizador = await queryDB("SELECT * FROM pessoa where nome = ?", [req.body.realizador[i]]);
                await queryDB("INSERT INTO realizador SET ?", {
                    idfilme: filme.insertId,
                    idpessoa: realizador[0].idpessoa
                })
            }
        }

        res.status(200).json({message: "Operação realizada com sucesso."})
    } catch (e) {
        res.status(400).json({message: "Erro: " + e})
    }
});

router.post('/:id/alterar',  async function (req, res) {
    try{
        let filme = await queryDB("SELECT * FROM filme where idfilme = ?", [req.params.id]);
        if (filme.length === 0)
            throw "Filme inexistente!";

        let sqlColumns = ""
        let sqlParameters = []

        for (var param in req.body) {
            switch (param) {
                case 'titulo':
                case 'ano':
                case 'sinopse':
                case 'siglaidioma':
                    sqlColumns += ` ${param} = ?,`;
                    sqlParameters.push(req.body[param]);
                    break;
            }
        }

        // remover a ultima virgula
        if (sqlColumns != "")
            sqlColumns = sqlColumns.slice(0, -1);

        // alterar filme
        let alterarFilme = await queryDB("UPDATE filme SET " + sqlColumns + " where idfilme = ?", sqlParameters.concat([req.params.id]));

        res.status(200).json({message: "Operação realizada com sucesso."})
    }
    catch(e){
        res.status(400).json({message: "Erro: " + e})
    }
});


router.post('/:id/eliminar',  async function (req, res) {

    try{
        let resultado = await queryDB("SELECT * FROM filme where idfilme = ?", [req.params.id]);
        if (resultado.length === 0)
            throw "Filme inexistente!";

        resultado = await queryDB("SELECT * FROM filmegenero where idfilme = ?", [req.params.id]);
        if (resultado.length > 0)
            throw "Existem generos associados";

        resultado = await queryDB("SELECT * FROM realizador where idfilme = ?", [req.params.id]);
        if (resultado.length > 0)
            throw "Existem realizadores associados";

        resultado = await queryDB("SELECT * FROM ator where idfilme = ?", [req.params.id]);
        if (resultado.length > 0)
            throw "Existem atores associados";

        // Eliminar registo
        resultado = await queryDB("DELETE FROM filme where idfilme = ?", req.params.id);
        if (resultado.affectedRows === 0)
            throw "Não foi eliminado nenhum registo";

        res.status(200).json({message: "Operação realizada com sucesso."})
    }
    catch(e){
        res.status(400).json({message: "Erro: " + e})
    }
});

router.get('/filmeporgenero', async function (req, res) {
    let filmes = await queryDB(`
        SELECT genero.nome, count(*) AS filmes 
        FROM filme, filmegenero, genero
        WHERE
            filme.idfilme = filmegenero.idfilme AND
            genero.idgenero = filmegenero.idgenero
            
        GROUP BY genero.nome
        `)

    res.send(filmes);
});

async function getFilmes(sqlFilter = "", parameters = []){
    let sql = `
        SELECT DISTINCT filme.idfilme AS idfilme, titulo, ano, sinopse, idioma.idioma, urlposter,
            (SELECT 
                GROUP_CONCAT(genero.nome SEPARATOR ",")
              FROM 
                filmegenero, genero
              WHERE
                filme.idfilme = filmegenero.idfilme AND
                filmegenero.idgenero = genero.idgenero 
            ) AS genero
            ,
            (SELECT 
                GROUP_CONCAT(pessoa.nome SEPARATOR ",")
              FROM 
                realizador, pessoa
              WHERE
                realizador.idfilme = filme.idfilme  AND
                realizador.idpessoa = pessoa.idpessoa
            ) AS realizador            
            ,
            (SELECT 
                GROUP_CONCAT(pessoa.nome SEPARATOR ",")
              FROM 
                ator, pessoa
              WHERE
                ator.idfilme = filme.idfilme  AND
                ator.idpessoa = pessoa.idpessoa
            ) AS ator
                  
        FROM 
            filme 
            LEFT JOIN filmegenero                   ON filmegenero.idfilme  = filme.idfilme  
            LEFT JOIN genero                        ON filmegenero.idgenero = genero.idgenero
            LEFT JOIN idioma                        ON filme.siglaidoma     = idioma.siglaidioma
            LEFT JOIN poster                        ON filme.idfilme        = poster.idFilme
            LEFT JOIN realizador                    ON realizador.idfilme   = filme.idfilme
            LEFT JOIN pessoa pessoarealizador       ON realizador.idpessoa  = pessoarealizador.idpessoa
            LEFT JOIN ator                          ON ator.idfilme         = filme.idfilme
            LEFT JOIN pessoa pessoaator             ON ator.idpessoa        = pessoaator.idpessoa
            
        WHERE
            1 = 1      
    `;

    let filmes = await queryDB(sql + sqlFilter, parameters)

    return filmes;
}

router.get('/', async function (req, res) {
    let apiHelp = `
    ## info 
    - GET filme/listar
    
    - GET filme/:id/detalhe
    "id" pode ser um "id" ou parte do "titulo" do filme
    
    - GET filme/filtrar?titulo&ano&genero&realizador&ator
    Lista filmes que obedecem aos critérios, os campos disponíveis são:
        titulo, ano, genero, realizador, ator
    
    - POST filme/criar
    Recebe um JSON com os detalhes do filme e criar
    
    - POST filme/:id/eliminar
    
    - POST file/:id/alterar
    
    - GET filme/filmeporgenero
    Devolve uma estatítica de quantidade de filmes por género
    
    - GET filme/excel
    `
    res.send(apiHelp);
});

module.exports = router;