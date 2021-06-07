import { Router } from "express";
import ProductoController from "./../controller/producto.controller"
const producto = Router();

producto.post('/producto', ProductoController.getInstance().create);

export default producto;