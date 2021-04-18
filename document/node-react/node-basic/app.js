// const {sum} = require('./helpers');
// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.end("hello from node js updated text");
// });

// server.listen(3000);

// var let const
// const total = sum(10, 200);
// console.log("Total: " + total);

// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send("hey whas up from express");
// });

// app.listen(3000);

const fs = require('fs');
const fileName = "target.txt";

// const data = fs.readFileSync(fileName);
// console.log(data.toString());

const errHandler = err => console.log(err);
const dataHandler = data => console.log(data.toString());

fs.readFile(fileName, (err, data) => {
    if(err) errHandler(err);
    dataHandler(data);
});

console.log("Node js async programming...?");