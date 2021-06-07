"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
        this.app = express();
    }
    Server.init = function (port) {
        return new Server(port);
    };
    Server.prototype.publicFolder = function () {
        var publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    };
    Server.prototype.start = function (callback) {
        this.CORS();
        this.app.listen(this.port, callback);
        this.publicFolder();
    };
    Server.prototype.CORS = function () {
        this.app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
            if (req.methods == "OPTIONS") {
                res.sendStatus(200);
            }
            else {
                next();
            }
        });
    };
    return Server;
}());
exports.default = Server;
