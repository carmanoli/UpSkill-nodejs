const {queryDB, connection} = require("./connection");

const express = require('express');
const app = express();

const router = express.Router();

router.get('/', async function (req, res) {
    console.log(connection.state);
    let utilizador = await queryDB(`SELECT * FROM utilizador`, [])

    res.send(utilizador);
});

module.exports = router;
