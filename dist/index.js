"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const env = require('../config/environment');
const serverUrl = env.IPADDR || '127.0.0.1';
const httpPort = normalizePort(env.PORT || 8080);
app_1.default.set('port', httpPort);
const httpServer = http.createServer(app_1.default);
httpServer.listen(httpPort, serverUrl);
httpServer.on('error', onError);
httpServer.on('listening', onListening);
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    let bind = (typeof httpPort === 'string') ? 'Pipe ' + httpPort : 'Port ' + httpPort;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    let addr = httpServer.address();
    let host = (addr.address) ? `${addr.address} ` : '';
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`HTTP server is listening on ${host}${bind}`);
}
