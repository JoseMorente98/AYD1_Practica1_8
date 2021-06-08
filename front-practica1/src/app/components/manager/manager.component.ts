import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ProductosService } from 'src/app/services/producto.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

//SWAL
declare var swal: any;
//JQUERY
declare var $: any;

@Component({
	selector: 'app-manager',
	templateUrl: './manager.component.html',
	styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
	/**
	 * PROPIEDADES FORMULARIO
	 */
	formData: FormGroup = new FormGroup({
		'id': new FormControl(0),
		'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
		'descripcion': new FormControl("", [Validators.required, Validators.maxLength(500)]),
		'precio': new FormControl(0, [Validators.required]),
		'costo': new FormControl(0, [Validators.required]),
		'cantidad': new FormControl(1, [Validators.required]),
		'imagen': new FormControl("https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png", [Validators.required]),
	});
	/**
	 * OTRAS PROPIEDADES
	 */
	public strImage: any = "";
	public file: File;

	constructor(
		private productoService: ProductosService,
		private uploadFileService: UploadFileService,
	) { }

	// Aqui van los nombres de las columnas 
	columnas: string[] = ['id', 'nombre', 'descripcion', 'precio', 'costo', 'cantidad', 'imagen'];

	// Aqui van los nombres de los encabezados de la tabla basicamente es el mismo de columnas pero para tener un mejor orden  
	headers: string[] = ['id', 'nombre', 'descripcion', 'precio', 'costo', 'cantidad', 'imagen'];

	// Aqui van los datos de la tabla basicamente solo hay que igualar esto al json que devulve la peticion y ya quedaria
	// datos = [{id:1}, {id:2}, {id:3}] este seria el formato
	datos = [];
	
	nombreBuscar = "";

	@ViewChild(MatTable) tabla1: MatTable<any>;

	ngOnInit(): void {
		this.getProducts();
	}

	getProducts() {
		this.productoService.read().subscribe((res: any) => {
			this.datos = res;
		}, (error) => {
			console.log("Ha ocurrido un error.")
		});
	}

	/**
	 * METODO PARA AGREGAR PRODUCTO
	 */
	agregar(): void {
		console.log(this.formData.value)
		this.productoService.create(this.formData.value)
			.subscribe((res) => {
				$('#modalFormDataAdd').modal('hide');
				
				this.showSwall("Producto Agregado", "El producto se ha agregado exitosamente.", "success","success");
				this.getProducts();
			}, (error) => {
				this.showSwall("Error","Ha ocurrido un error. Intentélo más tarde.","error","error");
			});
	}

	// Método Modificar Este Id es basicamente la posicion que tiene en la tabla de la vista pero si empezamos el id de la base desde 1 
	// basicamente seria el mismo
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

	// Método Eliminar Este Id es basicamente la posicion que tiene en la tabla de la vista pero si empezamos el id de la base desde 1 
	// basicamente seria el mismo	
	eliminar(Id: number): void {

		this.productoService.delete(Id).subscribe(
			() => {
				this.showSwall("Producto Eliminado", "El producto se elimino correctamente", "success", "success");
				this.getProducts();
			},
			(err) => {
				this.showSwall("Error","Ha ocurrido un error. Intentélo más tarde.","error","error");
			}
		);

	}

	buscar(): void {
		
		this.productoService.search(this.nombreBuscar).subscribe((res: any) => {
			this.datos = res;
		}, (error) => {
			console.log("Ha ocurrido un error.")
		});
		
	}
	
	clearbusqueda(): void {
		
		this.nombreBuscar = "";
		this.getProducts();
		
	}

	showSwall(titulo: string, texto: string, tipo: string, icon: string): void {
		swal({
			title: titulo,
			text: texto,
			type: tipo,
			icon: icon,
		});
	}

	/**
	 * SELECCION DE IMAGEN
	 * @param archivo
	 */
	seleccionImage(archivo: File | null): void {
		if (!archivo) {
			this.file = null;
			return;
		}

		if (archivo.type.indexOf('image') < 0) {
			swal({
				title: "Seleccionar imagen",
				text: "Debe de seleccionar una imagen.",
				icon: "info",
			});
			this.file = null;
			return;
		}

		this.file = archivo;
		let reader = new FileReader();
		let urlImagenTemp = reader.readAsDataURL(archivo);
		reader.onloadend = () => this.strImage = reader.result;
	}

	/**
	 * METODO PARA SUBIR IMAGEN A CLOUDINARY
	 */
	uploadImage(): void {
		this.uploadFileService.subirArchivo(this.file, 'AYDS1/Producto')
			.then((res: any) => {
				console.log(res);
				this.strImage = res.secure_url;
				this.imagen?.setValue(this.strImage);
				swal({
					title: "Foto cargada",
					text: "La imagen se ha subido exitosamente.",
					icon: "success",
				});
			})
			.catch((resp) => {
				swal({
					title: "Error",
					text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
					icon: "error",
				});
			});
	}

	get id() { return this.formData.get('id'); }
	get nombre() { return this.formData.get('nombre'); }
	get descripcion() { return this.formData.get('descripcion'); }
	get precio() { return this.formData.get('precio'); }
	get costo() { return this.formData.get('costo'); }
	get cantidad() { return this.formData.get('cantidad'); }
	get imagen() { return this.formData.get('imagen'); }

}