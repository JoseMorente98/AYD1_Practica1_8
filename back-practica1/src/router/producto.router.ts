import { Router } from "express";
import ProductoController from "./../controller/producto.controller"
const producto = Router();

producto.post('/producto', ProductoController.getInstance().create);
producto.delete('/producto/:id', ProductoController.getInstance().delete);

export default producto;