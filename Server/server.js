const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const server = express()
server.use(cors());
server.use(bodyParser.text());

const port = 3000;

const requestListener = function (req, res) {
    res.writeHead(200);
    console.log(`We are live at http://localhost:${port}`);
};

server.listen(port, requestListener);