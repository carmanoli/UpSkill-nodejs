const {queryDB} = require("./connection");
const express = require("express");
require("dotenv").config();
const excelJS = require("exceljs");
const router = express.Router();


// ----------------- GETs -----------------

// Listas Personalizadas (todas)
router.get("/listadesignacaopersonalizada", async function (req, res) {
    let lista = await queryDB("SELECT listadesignacaopersonalizada.idListaFilme, listadesignacaopersonalizada.designacao, listafilmeconteudo.idFilme, filme.titulo, utilizador.idutilizador, utilizador.nome\n" +
        "FROM listadesignacaopersonalizada, listafilmeconteudo, filme, utilizador \n" +
        "WHERE listadesignacaopersonalizada.idlistafilme =  listafilmeconteudo.idlistafilme \n" +
        "AND listafilmeconteudo.idfilme = filme.idfilme");
    res.json(lista);
});


// Listas Padronizadas (todas)
router.get("/designacaopadonizada", async function (req, res) {
    let lista = await queryDB("SELECT Designacao FROM designacaopadonizada");
    res.json(lista);
});


// Listas utilizadores (todos)
router.get("/utilizador", async function (req, res) {
    let lista = await queryDB("SELECT nome FROM utilizador");
    res.json(lista);
});


// Lista Personalizada e filmes / Utilizador
router.get("/listapersonalizada/:idutilizador", async function (req, res) {
    let lista = await queryDB("SELECT utilizador.nome, listadesignacaopersonalizada.designacao, filme.titulo FROM utilizador, listafilme, listadesignacaopersonalizada, filme, listafilmeconteudo WHERE utilizador.idutilizador = listafilme.idutilizador AND listafilme.idlistafilme = listadesignacaopersonalizada.idListaFilme AND listafilmeconteudo.idListaFilme = listafilme.idListaFilme AND listafilmeconteudo.idFilme = filme.idFilme AND utilizador.idutilizador = ?", [req.params.idutilizador]);
    if (lista.length>0) {
    }  else {
            lista = "Não há resultados!"
        }
    res.json(lista);
});


// Lista Padronizda e filmes / Utilizador
router.get("/listapadronizada/:idutilizador", async function (req, res) {
try {
    let lista = await queryDB("SELECT designacaopadonizada.Designacao, filme.titulo, utilizador.nome FROM listadesignacaopadronizada, listafilme, utilizador, listafilmeconteudo, filme, designacaopadonizada WHERE utilizador.idutilizador = listafilme.idutilizador AND listafilme.idlistafilme = listadesignacaopadronizada.idListaFilme AND designacaopadonizada.idDesignacaoPadronizada = listadesignacaopadronizada.idDesignacaoPadronizada AND listafilmeconteudo.idListaFilme = listafilme.idListaFilme AND listafilmeconteudo.idFilme = filme.idFilme AND listafilme.idutilizador = ?", [req.params.idutilizador]);
    if (lista.length > 0) {
        res.json(lista);
    } else {
        throw "Não há resultados!"
    }
} catch (e) {
    res.json(e)
}
});


//  ----------------- POSTs CRIAR -----------------


// Criar lista personalizada

// verifica se já existe lista personalizada e se nao existir cria uma nova
router.post('/listapersonalizada/criar', async function (req, res) {

    console.log("req.body", req.body)
    //verifica se a designacao pretendida do Postman ja existe
    let listaExistente = await queryDB("SELECT * FROM listadesignacaopersonalizada WHERE listadesignacaopersonalizada.designacao = ?", [req.body.designacao])
    if (listaExistente.length > 0) {
        res.status(400).send("Já existe um lista com esse nome!");
        return;
    }

    // nao existindo a designacao, entao ele vai determinar qual utilizador q vai criar a nova idListaFilme na tabela ListaFilme
    let resultado1 = await queryDB("INSERT INTO listafilme SET ?", {
        idUtilizador: req.body.idUtilizador
    });

    //vai buscar o idlistaFilme de numeracao automatica criado
    console.log("lastInsertedId", resultado1.insertId)

// insere na BD o idListaFilme criado automaticamente na tabela anterior (listafilme)
    let resultado2 = await queryDB("INSERT INTO listadesignacaopersonalizada SET ?", {
        designacao: req.body.designacao,
        idListaFilme:  resultado1.insertId
    });


 let   filmes = req.body.idfilme.split(',')

console.log("req.body", filmes)

// add filme na nova lista personalizada que foi criada
for(let i = 0; i<filmes.length; i++) {
    console.log("resultado1.insertId", resultado1.insertId , "req.body.idfilme[i]", filmes[i]);
    let addFilmeNaLista = await queryDB("INSERT INTO listafilmeconteudo SET ?", {
        idListaFilme:  resultado1.insertId,
        idfilme: filmes[i]
    })
}
    //insere na BD a designacao determinada no Postman
    //let designacaoPersonalizada = await queryDB("SELECT designacao FROM listadesignacaopersonalizada where listadesignacaopersonalizada.idListaFilme = ?", [resultado1.insertId]);
    let designacaoPersonalizada = await queryDB("SELECT utilizador.nome, listadesignacaopersonalizada.designacao, filme.titulo FROM utilizador, listafilme, listadesignacaopersonalizada, filme, listafilmeconteudo WHERE utilizador.idutilizador = listafilme.idutilizador AND listafilme.idlistafilme = listadesignacaopersonalizada.idListaFilme AND listafilmeconteudo.idListaFilme = listafilme.idListaFilme AND listafilmeconteudo.idFilme = filme.idFilme AND listafilme.idListaFilme = ?", [resultado1.insertId]);
    res.json(designacaoPersonalizada);
});


//  ----------------- POSTs APAGAR -----------------

router.post('/listapersonalizada/apagar/:idApagarLista', async function (req, res) {
    console.log(req.body);
    let lista = await queryDB("SELECT * FROM listadesignacaopersonalizada WHERE listadesignacaopersonalizada.idListaFilme = ?", [req.params.idApagarLista]);


    if (lista.length > 0) {
        await queryDB("DELETE FROM listadesignacaopersonalizada WHERE idlistafilme = ?", [req.params.idApagarLista])
        res.json('Lista apagada !')
    } else {
        res.json('Lista não pode ser apagada!')
    }
})


//  ----------------- POSTs EDITAR -----------------

router.post('/listapersonalizada/editar/:idEditarLista', async function (req, res) {
    let lista = await queryDB("SELECT * FROM listadesignacaopersonalizada WHERE listadesignacaopersonalizada.idListaFilme =?", [req.params.idEditarLista]);

    if(lista.length > 0){
        await queryDB("UPDATE listadesignacaopersonalizada SET designacao = ? WHERE listadesignacaopersonalizada.idListaFilme =?",[req.body.designacao, req.params.idEditarLista])
        res.json(lista);
    }else{
        res.json('Não é possível editar esta lista')
    }
})


//  ----------------- EXTRA -----------------

// GET lista/count lista padronizada com mais filmes
router.get("/countListaPadronizada", async function (req, res) {
    let lista = await queryDB("SELECT Designacao, COUNT(listafilmeconteudo.idListaFilme), utilizador.nome\n" +
        "FROM listafilmeconteudo, listadesignacaopadronizada, designacaopadonizada, listafilme, utilizador\n" +
        "WHERE listafilmeconteudo.idListaFilme = listadesignacaopadronizada.idListaFilme\n" +
        "AND designacaopadonizada.idDesignacaoPadronizada = listadesignacaopadronizada.idDesignacaoPadronizada\n" +
        "AND listafilme.idlistafilme = listafilmeconteudo.idListaFilme\n" +
        "AND listafilme.idutilizador = utilizador.idutilizador\n" +
        "GROUP BY Designacao, utilizador.nome, listafilme.idlistafilme\n" +
        "HAVING COUNT(*) >= ALL(SELECT COUNT(listafilmeconteudo.idListaFilme)\n" +
        "FROM listafilmeconteudo, listadesignacaopadronizada, designacaopadonizada, listafilme\n" +
        "WHERE listafilmeconteudo.idListaFilme = listadesignacaopadronizada.idListaFilme\n" +
        "AND designacaopadonizada.idDesignacaoPadronizada = listadesignacaopadronizada.idDesignacaoPadronizada\n" +
        "AND listafilme.idlistafilme = listafilmeconteudo.idListaFilme\n" +
        "GROUP BY Designacao, idutilizador, listafilme.idlistafilme)");
    res.json(lista);
});



//  ----------------- EXCEL -----------------

// envia todas as listas pro excel
router.get('/excel', async function (req, res) {
    let listasExcel = await queryDB("SELECT filme.titulo AS Titulo_Filme, listadesignacaopersonalizada.designacao AS Lista_Personalizada, designacaopadonizada.Designacao AS Lista_Padronizada, utilizador.nome AS Utilizador FROM filme, listadesignacaopersonalizada, designacaopadonizada, utilizador, listafilme, listafilmeconteudo WHERE listafilme.idlistafilme = listafilmeconteudo.idListaFilme AND listafilmeconteudo.idFilme = filme.idfilme AND listafilme.idutilizador = utilizador.idutilizador;");

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('listasBD');
    let colunas = [];
    for (let i in listasExcel[0]) {
        if (listasExcel[0].hasOwnProperty(i)) {
            colunas.push(i);
        }
    }
    let cabecalho = [];
    colunas.forEach((coluna) => {
        cabecalho.push({header: coluna, key: coluna});
    })
    worksheet.columns = cabecalho;
    listasExcel.forEach((dados) => {
        worksheet.addRow(dados);
    })

    let excel = await workbook.xlsx.writeBuffer();
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=listasBD.xlsx");
    res.send(excel);
});



module.exports = router;