"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server/server"));
var mysql_1 = __importDefault(require("./mysql/mysql"));
var producto_router_1 = __importDefault(require("./router/producto.router"));
var bodyParser = require("body-parser");
/**
 * CONFIGURACIÓN DE PUERTO LOCAL Y PRODUCCIÓN
 */
var PORT = parseInt(process.env.PORT, 10) || 3000;
var server = server_1.default.init(PORT);
/**
 * INSTANCIA DE MYSQL
 */
mysql_1.default.getInstance();
var api = "/api/";
/**
 * HEADEARS & CORS
 */
server.app.use(function (req, res, next) {
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
/**
 * BODY PARSER
 */
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: false }));
/**
 * API'S
 */
server.app.use(api, producto_router_1.default);
server.start(function () {
    console.log("Servidor corriendo en el puerto 3000 :D");
});
