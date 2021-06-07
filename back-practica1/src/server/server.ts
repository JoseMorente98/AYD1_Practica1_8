import express = require('express');
import path = require('path');


export default class Server {
    public app: express.Application;
    public port: number;

    constructor(port:number) {
        this.port = port;
        this.app = express();
    }

    static init(port:number) {
        return new Server(port);
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use( express.static(publicPath));
    }

    start(callback: any) {
        this.CORS();
        this.app.listen(this.port, callback);
        this.publicFolder();
    }

    private CORS() {
        this.app.use((req:any, res:any, next:any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
            if(req.methods == "OPTIONS") {
            res.sendStatus(200);
          } else {
            next();
          }
        });
    }
}