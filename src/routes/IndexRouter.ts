import {Router, Request, Response, NextFunction} from 'express';
import * as path from 'path';

export class IndexRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../public', '404.html'));
        });
    }
}

export default new IndexRouter().router;