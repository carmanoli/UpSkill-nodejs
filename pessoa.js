const {queryDB, connection} = require("./connection");

const express = require('express');
const app = express();

const router = express.Router();

router.get('/', async function (req, res) {
    console.log(connection.state);
    let pessoa = await queryDB(`SELECT * FROM pessoa`, [])

    res.send(pessoa);
});

module.exports = router;
