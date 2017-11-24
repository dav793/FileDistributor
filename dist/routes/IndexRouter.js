"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path = require("path");
class IndexRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../public', '404.html'));
        });
    }
}
exports.IndexRouter = IndexRouter;
exports.default = new IndexRouter().router;
