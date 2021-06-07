"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var producto_controller_1 = __importDefault(require("./../controller/producto.controller"));
var producto = express_1.Router();
producto.post('/producto', producto_controller_1.default.getInstance().create);
<<<<<<< HEAD
producto.get('/producto', producto_controller_1.default.getInstance().getAll);
=======
producto.delete('/producto/:id', producto_controller_1.default.getInstance().delete);
>>>>>>> 563fe6ee1279b15221686d614bdbc049d73cc20e
exports.default = producto;
