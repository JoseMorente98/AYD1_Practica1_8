"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var ProductoController = /** @class */ (function () {
    function ProductoController() {
        this.create = function (req, res) {
            var body = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                costo: req.body.costo,
                cantidad: req.body.cantidad,
                imagen: req.body.imagen,
            };
            var query = "\n            INSERT INTO Producto(nombre, descripcion, precio, costo, cantidad, imagen)\n            VALUES (?, ?, ?, ?, ?, ?)\n        ";
            mysql_1.default.sendQuery(query, [body.nombre, body.descripcion, body.precio, body.costo, body.cantidad, body.imagen], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200
                    });
                }
            });
        };
    }
    ProductoController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return ProductoController;
}());
exports.default = ProductoController;
