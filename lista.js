const {queryDB, connection} = require("./connection");

const express = require('express');
const app = express();

const router = express.Router();

router.get('/', async function (req, res) {
    console.log(connection.state);
    let listafilme = await queryDB(`SELECT * FROM listafilme`, [])

    res.send(listafilme);
});

module.exports = router;
