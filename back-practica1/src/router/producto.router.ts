import { Router } from "express";
import ProductoController from "./../controller/producto.controller"
const producto = Router();

producto.post('/producto', ProductoController.getInstance().create);
producto.get('/producto', ProductoController.getInstance().getAll);

export default producto;