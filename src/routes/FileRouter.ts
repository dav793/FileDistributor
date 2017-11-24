import {Router, Request, Response, NextFunction} from 'express';
import * as path from 'path';

const fs = require('fs');

const dirPaths = require('../../config/dirPaths');

const fileController = require('../controllers/FileController');

export class FileRouter {
	router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	init() {
		this.router.get('/', (req: Request, res: Response) => {
            fileController.getDirListPage(Object.keys(dirPaths), (err: any, file: any) => {
                if (err) 
                    res.status(500).send(err);
                else
                    res.send(file);
            });
		});

		this.router.get('/:dirId', (req: Request, res: Response) => {
			if (req.params.dirId in dirPaths) {

				let url = dirPaths[req.params.dirId];

				if (fs.lstatSync(url).isDirectory()) {
					fs.readdir(url, function(err, items) {
					    //res.json(items);

					    fileController.getFileListPage(items, req.params.dirId, (err: any, html: string) => {
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

		this.router.get('/:dirId/:fileName', (req: Request, res: Response) => {
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

export default new FileRouter().router;