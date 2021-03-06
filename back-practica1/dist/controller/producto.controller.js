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
            var query = "\n            INSERT INTO Producto(nombre, descripcion, precio, costo, cantidad, imagen)\n            VALUES (?, ?, ?, ?, ?, ?);\n        ";
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
        this.getAll = function (req, res) {
            var query = "\n            SELECT * FROM Producto;\n        ";
            mysql_1.default.getQuery(query, function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data);
                }
            });
        };
        this.delete = function (req, res) {
            var id = req.params.id;
            var query = "DELETE FROM Producto WHERE id = ?";
            mysql_1.default.sendQuery(query, [id], function (err, data) {
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
        this.search = function (req, res) {
            var nombre = req.params.nombre;
            var query = "SELECT * FROM Producto WHERE nombre = ?";
            mysql_1.default.sendQuery(query, [nombre], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data);
                }
            });
        };
        this.update = function (req, res) {
            var body = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                costo: req.body.costo,
                cantidad: req.body.cantidad,
                imagen: req.body.imagen,
                id: req.body.id
            };
            
            var query = `UPDATE Producto 
                         SET nombre = ?, 
                             descripcion = ?, 
                             precio = ?, 
                             costo = ?, 
                             cantidad = ?, 
                             imagen = ?
                         WHERE id = ?`;
            mysql_1.default.sendQuery(query, [body.nombre, body.descripcion, body.precio, body.costo, body.cantidad, body.imagen, body.id], function (err, data) {
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
