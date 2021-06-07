import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatTable} from '@angular/material/table';
import { ProductosService } from 'src/app/services/producto.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

//SWAL
declare var swal:any;
//JQUERY
declare var $:any;

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
	/**
	 * PROPIEDADES FORMULARIO
	 */
	formData:FormGroup = new FormGroup({
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
	columnas: string[] = ['Ejemplo'];
	
	// Aqui van los nombres de los encabezados de la tabla basicamente es el mismo de columnas pero para tener un mejor orden  
	headers: string[] = ['Ejemplo', 'Modificar', 'Borrar'];
  
	// Aqui van los datos de la tabla basicamente solo hay que igualar esto al json que devulve la peticion y ya quedaria
	// datos = [{id:1}, {id:2}, {id:3}] este seria el formato
	datos = [{Ejemplo: "DatoEjemplo1"}, {Ejemplo: "DatoEjemplo2"}];

	@ViewChild(MatTable) tabla1: MatTable<any>;

	ngOnInit(): void {
	}
	
	
	/**
	 * METODO PARA AGREGAR PRODUCTO
	 */
	agregar(): void {
		console.log(this.formData.value)
		this.productoService.create(this.formData.value)
		.subscribe((res) => {
		console.log(res)
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
	
	// Método Modificar Este Id es basicamente la posicion que tiene en la tabla de la vista pero si empezamos el id de la base desde 1 
	// basicamente seria el mismo
	modificar(Id: number): void {
		
		
	}
	
	// Método Eliminar Este Id es basicamente la posicion que tiene en la tabla de la vista pero si empezamos el id de la base desde 1 
	// basicamente seria el mismo	
	eliminar(Id: number): void {
		
		
		
	}

	/**
	 * SELECCION DE IMAGEN
	 * @param archivo
	 */
	seleccionImage( archivo: File | null ): void {
		if ( !archivo ) {
		  this.file = null;
		  return;
		}
	
		if ( archivo.type.indexOf('image') < 0 ) {
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
		let urlImagenTemp = reader.readAsDataURL( archivo );
		reader.onloadend = () => this.strImage = reader.result;
	}

	/**
	 * METODO PARA SUBIR IMAGEN A CLOUDINARY
	 */
	uploadImage(): void {
		this.uploadFileService.subirArchivo( this.file, 'AYDS1/Producto' )
		.then((res:any) => {
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
	get nombre() { return this.formData.get( 'nombre'); }
	get descripcion() { return this.formData.get('descripcion'); }
	get precio() { return this.formData.get('precio'); }
	get costo() { return this.formData.get('costo'); }
	get cantidad() { return this.formData.get('cantidad'); }
	get imagen() { return this.formData.get('imagen'); }

}