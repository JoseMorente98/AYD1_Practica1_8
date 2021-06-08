# **Análisis y Diseño de Sistemas 1**

## **Contenido**   
- [Integrantes](#integrantes)
- [Arquitectura](#arquitectura)
- [Requerimientos mínimos](#requerimientos)
- [Comandos Git Flow](#comandos)
- [MySQL](#mysql)
- [Node JS](#nodejs)
   - [API Agregar](#APIagregar)
   - [API Actualizar](#APIactualizar)
   - [API Obtener](#APIobtener)
   - [API Eliminar](#APIeliminar)
   - [API Buscar](#APIbuscar)
- [Angular](#angular)
   - [Método Agregar](#Metodoagregar)
   - [Método Actualizar](#Metodoactualizar)
   - [Método Obtener](#Metodoobtener)
   - [Método Eliminar](#Metodoeliminar)
   - [Método Buscar](#Metodobuscar)
- [GitFlow](#gitflow)

## **Integrantes**<a name="integrantes"></a>
- **201801195**	JOSE CARLOS JIMENEZ
- **201801237**	JOSÉ RAFAEL MORENTE GONZÁLEZ
- **201801262**	JUAN JOSE RAMOS CAMPOS
- **201801628**	SERGIO ALEXANDER ECHIGOYEN GÓMEZ
- **201807266**	LUIS FERNANDO VELASQUEZ ZACARIAS


## **Arquitectura**<a name="arquitectura"></a>
La siguiente figura muestra la arquitectura de nuestro aplicación cliente servidor. Se muestra la forma en que Tytus DB organizo e implemento la arquitectura, teniendo los clientes usando Angular, el servidor utilizando Node JS y de base de datos MySQL se realizó por facilidad ya que tenemos un servidor ejecutando MySQL para que todos accedieran a la misma data.

![Arquitectura](https://res.cloudinary.com/dtpqmjmhk/image/upload/v1623114537/AYDS1/Untitled_Diagram_stgnak.png)

## **MySQL**<a name="mysql"></a>
Se generó una tabla en MySQL por facilidades de tenerlo remotamente para que todos podamos acceder a los mismos datos en diferente dispositivos.
``` sql
CREATE TABLE Producto(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    precio DECIMAL(15,2) NOT NULL,
    costo DECIMAL(15,2) NOT NULL,
    cantidad INT NOT NULL,
    imagen VARCHAR(500) NOT NULL
);
``` 

## **Requerimientos mínimos**<a name="requerimientos"></a>

## **Comandos Git Flow**<a name="comandos"></a>

## **Node JS**<a name="nodejs"></a>
### **API Agregar**<a name="APIagregar"></a>
Se genera un controlador donde se colocaran los métodos para cada acción que se pueda realizar de un Producto.
En el primer segmento de código obtenemos los parametros que nos envíen en formato JSON haciendo una llamada al cuerpo en la petición.
Procedemos a realizar la consulta donde los valores se representan con el signo (?), al llamar al objeto MySQL envíamos la consulta y los parametros recibidos en el body. Si todo es correcto nos envía un status 200, caso contrario la API nos enviará un error 400.
``` typescript
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
```

### **API Actualizar**<a name="APIactualizar"></a>
La función update es una parte importante de un CRUD ya que conlleva la gestión de la información de los productos para que se puedan actualizar y mantener al día sin necesidad de crear nuevos productos.

## Backend
En este método se utiliza la función PUT de la API para consultar a MySQL y colocar la nueva información mediante un arreglo con los parámetros ordenados y el objeto mysql.
```Javascript
update = (req: Request, res:Response) => {
    let body = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        costo: req.body.costo,
        cantidad: req.body.cantidad,
        imagen: req.body.imagen,
        id: req.body.id
    };
    
    let query = `UPDATE Producto 
                    SET nombre = ?, 
                        descripcion = ?, 
                        precio = ?, 
                        costo = ?, 
                        cantidad = ?, 
                        imagen = ?
                    WHERE id = ?`;
    MySQL.sendQuery(query, 
        [body.nombre, body.descripcion, body.precio, body.costo, body.cantidad, body.imagen, body.id], 
        ( err: any, data: Object[]) => {
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
        }
    )
}
```

## Frontend
Aquí se utiliza una función que pueda actualizar los datos pertenecientes a la clase y a su vez existe un trigger en el que se abre un modal con el formulario.
```Javascript
modificar(): void {
    console.log(this.formData.value)
    this.productoService.update(this.formData.value)
        .subscribe((res) => {
            $('#modalFormDataUpdate').modal('hide');
            
            this.showSwall("Producto actualizado", "El producto se ha actualizado exitosamente.", "success","success");
            this.getProducts();
        }, (error) => {
            this.showSwall("Error","Ha ocurrido un error. Intentélo más tarde.","error","error");
        });
}

update(item: any){
    this.id.setValue(item.id)
    this.nombre.setValue(item.nombre)
    this.descripcion.setValue(item.descripcion)
    this.precio.setValue(item.precio)
    this.costo.setValue(item.costo)
    this.cantidad.setValue(item.cantidad)
    this.imagen.setValue(item.imagen)
    this.strImage = item.imagen
}
```

### **API Obtener**<a name="APIobtener"></a>
Se obitene el request de la petición HTTP, en este método no se esperan datos.
Se realiza la consulta a la base de datos que obtendrá todos los datos de la tabla Producto.
Devolverá la tupla de datos si es correcta la consulta, en caso de error devolverá el código 400.

``` typescript
getAll = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Producto;
        `;

        MySQL.getQuery(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data);
            }
        })
    }
```

### **API Eliminar**<a name="APIeliminar"></a>

### **API Buscar**<a name="APIbuscar"></a>
Se realiza un petición de tipo get la cual se realiza en base al query "select * from producto where = Z" donde Z es el nombre 
del producto que se desea buscar de ser exitosa la búsqueda se retorna la respuesta en forma de json al cliente, en caso contrario 
de ser fallida se retorna un mensaje de errro con codigo 400.
	
		search = (req: Request, res: Response) => {
			
			const nombre = req.params.nombre;
			const query = `SELECT * FROM Producto WHERE nombre = ?`;

			MySQL.sendQuery(query, [nombre], (err: any, data: Object[]) => {
				if (err) {
					res.status(400).json({
						ok: false,
						status: 400,
						error: err
					});
				} else {
					res.json(data);
				}
			})	
			
		}

## **Angular**<a name="angular"></a>
### **Método Agregar**<a name="Metodoagregar"></a>
Primero generamos un formulario con las propiedades que deseamos enviar a nuestro servicio para agregar datos.
Los FormControl se encargan de crear un control para el formulario donde nosotros obtenemos los datos, y podemos pedir datos requeridos o una longitud máxima.
``` typescript
formData:FormGroup = new FormGroup({
    'id': new FormControl(0),
    'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
    'descripcion': new FormControl("", [Validators.required, Validators.maxLength(500)]),
    'precio': new FormControl(0, [Validators.required]),
    'costo': new FormControl(0, [Validators.required]),
    'cantidad': new FormControl(1, [Validators.required]),
    'imagen': new FormControl("https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png", [Validators.required]),
});
```

Para envíar nuestros datos a la API de agregar productos, utilizamos el siguiente método. donde realizamos una llamada de nuestro servicio producto, donde en el método create envíamos el formulario y los valores que este contiene. Si todo sale bien entonces llama un alert mostrando que se agregó, en caso falle el servicio aparecerá un mensaje de error diciendo que intentemos más tarde.
``` typescript
agregar(): void {
    this.productoService.create(this.formData.value)
    .subscribe((res) => {
        $('#modalFormDataAdd').modal('hide');
        swal({
            title: "Producto Agregado",
            text: "El producto se ha agregado exitosamente.",
            type: "success",
            icon: "success",
        });
    }, (error) => {
        swal({
            title: "Error",
            text: "Ha ocurrido un error. Intentélo más tarde.",
            type: "error",
            icon: "error",
        });
    });
}
```

### **Método Actualizar**<a name="Metodoactualizar"></a>

### **Método Obtener**<a name="Metodoobtener"></a>
Se obtienen datos de la API mediante el servicio de angular, el cual envia un GET, por HTTP.
Se obitene un JSON con todos los datos de todos los productos y en HTML se odenan en una tabla.
``` typescript
getProducts() {
		this.productoService.read().subscribe((res: any) => {
			this.datos = res;
		}, (error) => {
			console.log("Ha ocurrido un error.")
		});
	}
```


### **API Eliminar**<a name="APIeliminar"></a>
Esta funcion se encarga de eliminar un elemento de la base de datos, en el cuerpo del
request de la peticion HTTP recibe como parametro el Id del elemento a eliminar, ese elemento se almacena
en una variable llamada id, dicha variable se envia junto a la consulta para eliminar y en caso de tener todo 
correcto retorna un status de exito, de lo contrario retorna un error.

``` typescript
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
```


### **API Buscar**<a name="APIbuscar"></a>

Se realiza un petición de tipo get la cual se realiza en base al query "select * from producto where = Z" donde Z es el nombre 
del producto que se desea buscar de ser exitosa la búsqueda se retorna la respuesta en forma de json al cliente, en caso contrario 
de ser fallida se retorna un mensaje de errro con codigo 400.

``` typescript
search = (req: Request, res: Response) => {
			
    const nombre = req.params.nombre;
    const query = `SELECT * FROM Producto WHERE nombre = ?`;

    MySQL.sendQuery(query, [nombre], (err: any, data: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                status: 400,
                error: err
            });
        } else {
            res.json(data);
        }
    })	
    
}
```	

### **Comandos Git Flow**<a name="gitflow"></a>
Los comandos de git flow utilizados en la practica fueron los siguientes:
	
git flow init - Este comando inicializa un flujo de trabajo git flow en nuestro repositorio 
	
Comandos necesarios para un merge a develop:
	
	git checkout develop
	git flow feature finish --keep <name>
	git push origin develop 
		
Comandos necesarios para hacer un release y merge a main:
	
	git checkout develop 
	git flow release start 1.1.0
	git flow release finish --keep 1.1.0
	git push origin release/1.1.0
	git checkout main 
	git push origin main	

### **Flujo de trabajo Git Flow**<a name="gitflow"></a>
![Flujo 1](https://res.cloudinary.com/dtpqmjmhk/image/upload/v1623127036/AYDS1/Practica%201/WhatsApp_Image_2021-06-07_at_10.33.26_PM_1_wkc1wt.jpg)
![Flujo 2](https://res.cloudinary.com/dtpqmjmhk/image/upload/v1623127036/AYDS1/Practica%201/WhatsApp_Image_2021-06-07_at_10.33.26_PM_d2rp9w.jpg)

