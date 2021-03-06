# **Análisis y Diseño de Sistemas 1**

## **Contenido**   
- [Integrantes](#integrantes)
- [Manual de Usuario](#usuario)
   - [Dashboard](#dashboard)
   - [Agregar](#agregar)
   - [Actualizar](#actualizar)
   - [Obtener](#obtener)
   - [Eliminar](#eliminar)
   - [Buscar](#buscar)

## **Integrantes**<a name="integrantes"></a>
- **201801195**	JOSE CARLOS JIMENEZ
- **201801237**	JOSÉ RAFAEL MORENTE GONZÁLEZ
- **201801262**	JUAN JOSE RAMOS CAMPOS
- **201801628**	SERGIO ALEXANDER ECHIGOYEN GÓMEZ
- **201807266**	LUIS FERNANDO VELASQUEZ ZACARIAS

## **Manual de Usuario**<a name="usuario"></a>
### **Dashboard**<a name="dashboard"></a>
En la pantalla de inicio se muestran los datos de los 5 intregantes del grupo Tytus DB.

![CRUD 0](https://res.cloudinary.com/dtpqmjmhk/image/upload/v1623123376/AYDS1/Practica%201/F1_2_fcln2i.png)

### **Agregar**<a name="agregar"></a>
El usuario final puede ser capaz de agregar productos en la página web. Se despliega un modal con los siguientes campos:
- nombre
- descripcion
- precio
- costo
- cantidad
- imagen

Para la imagen se puede seleccionar la imagen. Y antes de guardar el formulario presionamos la tecla subir imagen una vez confirmado que se ha subido exitosamente podemos proceder a guardar los cambios en la base de datos.

![CRUD 1](https://res.cloudinary.com/dtpqmjmhk/image/upload/v1623123376/AYDS1/Practica%201/F2_blmgme.png)

### **Actualizar**<a name="actualizar"></a>
![CRUD 2](https://res.cloudinary.com/dtpqmjmhk/image/upload/v1623123376/AYDS1/Practica%201/F3_w4haeb.png)
Se muestra un formulario en el que se cargan los datos del producto a actualizar y su opción a cambio.

### **Obtener**<a name="obtener"></a>
![CRUD 3](https://res.cloudinary.com/dtpqmjmhk/image/upload/v1623123376/AYDS1/Practica%201/F6_ni4f3g.png)
Se muestran los productos con sus respectivas características, mostranto en miniatura la imagen de cada uno, así como el precio y la cantida disponible.

### **Eliminar**<a name="eliminar"></a>
![CRUD 4](https://res.cloudinary.com/dtpqmjmhk/image/upload/v1623123375/AYDS1/Practica%201/F4_vzohow.png)
El usuario final es capaz de eliminar cualquier producto que haya creado con anterioridad, para ello, basta con presionar el boton que tiene el icono de un
cesto de basura y el producto se intentara eliminar automaticamente, mostrando un mensaje de exito y quitando el producto si el proceso fue exitoso o bien 
mostrando una alerta de fallo en caso de no serlo. 


### **Buscar**<a name="buscar"></a>
![CRUD 5](https://res.cloudinary.com/dtpqmjmhk/image/upload/v1623123374/AYDS1/Practica%201/F5_xj9gc2.png)
El usuario final puede ser capaz de buscar cualquier producto que se encuentre alojado en la base de datos en base a su nombre, 
el diseño es intiutivo contando con un input y dos botones, el input permite ingresar el nombre del producto a buscar y al presionar
el botón buscar realizara la busqueda mostrando los resultados en la tabla, además, luego de un búsqueda para regresar al estado 
original y visualizar todos los productos se puede utilizar el botón clear que regresa la tabla a su estado original.