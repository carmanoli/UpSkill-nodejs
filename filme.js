const {queryDB, connection} = require("./connection");

const express = require('express');
const app = express();

const router = express.Router();

router.get('/', async function (req, res) {
    console.log(connection.state);
    let filmes = await queryDB(`SELECT * FROM filme`, [])

    res.send(filmes);
});

module.exports = router;
