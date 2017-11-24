"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const FileRouter_1 = require("./routes/FileRouter");
const env = require('../config/environment');
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(cors());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        this.express.use('/', express.static(path.join(__dirname, '../public')));
        this.express.use('/node_modules', express.static(path.join(__dirname, '../', 'node_modules')));
        this.express.use('/download', FileRouter_1.default);
        this.express.all('*', (req, res) => {
            console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
            res.status(200).sendFile(path.join(__dirname, '../public', '404.html'));
        });
    }
}
exports.default = new App().express;
