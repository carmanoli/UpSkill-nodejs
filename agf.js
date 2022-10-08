const express = require('express');
const app = express();

app.use("/filme", require("./filme.js"));
app.use("/lista", require("./lista.js"));
app.use("/pessoa", require("./pessoa.js"));
app.use("/utilizador", require("./utilizador.js"));
app.listen(3000);