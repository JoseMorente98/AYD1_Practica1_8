"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var producto_controller_1 = __importDefault(require("./../controller/producto.controller"));
var producto = express_1.Router();
producto.post('/producto', producto_controller_1.default.getInstance().create);
producto.get('/producto', producto_controller_1.default.getInstance().getAll);
producto.delete('/producto/:id', producto_controller_1.default.getInstance().delete);
producto.get('/search/producto/:nombre', producto_controller_1.default.getInstance().search);
producto.put('/producto', producto_controller_1.default.getInstance().update);
exports.default = producto;
