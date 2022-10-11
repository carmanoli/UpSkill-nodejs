const express = require('express');
const app = express();
const {queryDB} = require("./connection.js");
const {connection} = require("./connection");
const router = express.Router();

// listar utilizadores existentes
// app.listen(3000);


router.get('/:id/detalhe', async function (req, res) {

    try
    {
        if (req.params.filme == ""){
            return res.status(400).send({message: 'Deve especificar mais informação!'});
        }

            let utilizador = await queryDB(`
                SELECT nome, email, password, pontuacao, comentario, datahora AS visualizacao 
                    FROM utilizador, pontuacao, visualizacao 
                    WHERE 
                        utilizador.idutilizador = pontuacao.idutilizador AND 
                        utilizador.idutilizador = visualizacao.idutilizador AND
                        utilizador.idutilizador = ?                        
             `,
                [req.params.id]
                );


        console.log("/:id/detalhe: ", utilizador);

        res.status(200).json(utilizador)
    }
    catch(e){
        res.status(400).json({message: "Erro: " + e})
    }
});



router.get('/listar', async function (req, res) {
    try
    {
        let utilizadorlista = await queryDB("SELECT nome, email, password, pontuacao, comentario, datahora AS visualizacao FROM utilizador, pontuacao, visualizacao WHERE utilizador.idutilizador = pontuacao.idutilizador AND utilizador.idutilizador = visualizacao.idutilizador");
        res.json(utilizadorlista);

    }
    catch(e){
        res.status(400).json({message: "Erro: " + e})
    }
});

var bodyParser = require('body-parser')
const ExcelJS = require("exceljs");
var jsonParser = bodyParser.json()

router.post('/criar', jsonParser, async function (req, res) {

    try {
        // Verificar se filme já existe

        let utilizador = await queryDB("SELECT * FROM utilizador WHERE nome = ?", [ req.body.nome]);
        if (utilizador.length > 0)
            throw "Já existe utilizador";

        await queryDB("INSERT INTO utilizador SET ?", req.body)

        res.status(200).json({message: "Operação realizada com sucesso."})
    } catch (e) {
        res.status(400).json({message: "Erro: " + e})
    }
});




router.post('/:id/eliminar', jsonParser, async function (req, res) {
    console.log('/:id/eliminar ', req.params.id);

    try{
        let resultado = await queryDB("SELECT * FROM pontuacao where idutilizador = ?", [req.params.id]);
        if (resultado.length > 0)
            throw "Existem registos associados associados";

        resultado = await queryDB("SELECT * FROM visualizacao where idutilizador = ?", [req.params.id]);
        if (resultado.length > 0)
            throw "Existem registos associados associados";

        // Eliminar utilizador
        resultado = await queryDB("DELETE FROM utilizador where idutilizador = ?", req.params.id);
        if (resultado.affectedRows === 0)
            throw "Não foi eliminado nenhum registo";


        res.status(200).json({message: "Operação realizada com sucesso."})
    }
    catch(e){
        res.status(400).json({message: "Erro: " + e})
    }
});

router.post('/:id/alterar', jsonParser, async function (req, res) {
    try{
        let utilizador = await queryDB("SELECT * FROM utilizador where idutilizador = ?", [req.params.id]);
        if (utilizador.length === 0)
            throw "Registo inexistente!";

        await queryDB("UPDATE utilizador SET nome = ?, email = ?, password = ? where idutilizador = ?", [req.body.nome, req.body.email, req.body.password, req.params.id]);

        res.status(200).json({message: "Operação realizada com sucesso."})
    }
    catch(e){
        res.status(400).json({message: "Erro: " + e})
    }
});




router.get('/excel', async function (req, res) {

    try
    {
        const workbook = new ExcelJS.Workbook();

        let utilizador = await queryDB("SELECT nome, email, password, pontuacao, comentario, datahora AS visualizacao FROM utilizador, pontuacao, visualizacao WHERE utilizador.idutilizador = pontuacao.idutilizador AND utilizador.idutilizador = visualizacao.idutilizador");



        const worksheet = workbook.addWorksheet("utilizador");

        worksheet.columns = Object.keys(utilizador[0])
            .map(key => ({header: key, key: key}));


        utilizador.forEach(
            linha =>
                worksheet.addRow(linha)
        )


        let excel = await workbook.xlsx.writeBuffer();

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=utilizadores.xlsx");

        res.send(excel);
    }
    catch(e){
        res.status(400).json({message: "Erro: " + e})
    }
})



router.get('/comentariosporutilizador', async function (req, res) {

    let utilizador = await queryDB(`
        SELECT utilizador.nome, count(*) AS cometarios 
        FROM utilizador, pontuacao
        WHERE
            utilizador.idutilizador = pontuacao.idutilizador
            
        GROUP BY utilizador.idutilizador
        `)

    res.send(utilizador);
});
module.exports = router;
