const mysql = require('mysql');
const ExcelJS = require("exceljs");
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect();

async function queryDB(query, values) {
    return new Promise(function (resolve, reject) {
        connection.query(query, values, function (error, results) {
            if (error) {
                reject(error)
                return;
            }
            resolve(results);
        });
    });
}

module.exports = {queryDB, connection};
