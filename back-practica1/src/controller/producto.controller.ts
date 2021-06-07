import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class ProductoController {
    private static _instance: ProductoController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    create = (req: Request, res: Response) => {
        let body = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            costo: req.body.costo,
            cantidad: req.body.cantidad,
            imagen: req.body.imagen,
        }
        
        const query = `
            INSERT INTO Producto(nombre, descripcion, precio, costo, cantidad, imagen)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        
        MySQL.sendQuery(query, 
            [body.nombre, body.descripcion, body.precio, body.costo, body.cantidad, body.imagen], 
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200
                })
            }
        })
    }


    delete = (req: Request, res: Response) => {
        const id = req.params.id;
        const query = `DELETE FROM Producto WHERE id = ?`;
        
        MySQL.sendQuery(query, 
            [id], 
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200
                })
            }
        })
    }
}