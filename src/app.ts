import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import FileRouter from './routes/FileRouter';

const env = require('../config/environment');

class App {

	// ref to Express instance
	public express: express.Application;

	//Run configuration methods on the Express instance.
	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
	}

	// Configure Express middleware.
	private middleware(): void {
		this.express.use(cors());		 // cross-origin resource sharing
		this.express.use(logger('dev'));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
	}

	// Configure route
	private routes(): void {
		this.express.use('/', express.static(path.join(__dirname, '../public')));
		this.express.use('/node_modules', express.static(path.join(__dirname, '../', 'node_modules')));

		this.express.use('/download', FileRouter);

		// 404 response
		this.express.all('*', (req: any, res: any) => {
			console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
			res.status(200).sendFile(path.join(__dirname, '../public', '404.html'));
		});
	}

}

export default new App().express;
