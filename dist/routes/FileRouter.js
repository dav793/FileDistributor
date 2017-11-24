"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path = require("path");
const fs = require('fs');
const dirPaths = require('../../config/dirPaths');
const fileController = require('../controllers/FileController');
class FileRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', (req, res) => {
            fileController.getDirListPage(Object.keys(dirPaths), (err, file) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(file);
            });
        });
        this.router.get('/:dirId', (req, res) => {
            if (req.params.dirId in dirPaths) {
                let url = dirPaths[req.params.dirId];
                if (fs.lstatSync(url).isDirectory()) {
                    fs.readdir(url, function (err, items) {
                        fileController.getFileListPage(items, req.params.dirId, (err, html) => {
                            if (err)
                                res.status(500).send(err);
                            else
                                res.send(html);
                        });
                    });
                }
                else
                    res.status(200).sendFile(path.join(__dirname, '../../public', '404.html'));
            }
            else
                res.status(200).sendFile(path.join(__dirname, '../../public', '404.html'));
        });
        this.router.get('/:dirId/:fileName', (req, res) => {
            if (req.params.dirId in dirPaths) {
                let url = dirPaths[req.params.dirId] + '/' + decodeURI(req.params.fileName);
                if (fs.lstatSync(url).isFile())
                    res.download(url);
                else
                    res.status(200).sendFile(path.join(__dirname, '../../public', '404.html'));
            }
            else
                res.status(200).sendFile(path.join(__dirname, '../../public', '404.html'));
        });
    }
}
exports.FileRouter = FileRouter;
exports.default = new FileRouter().router;
