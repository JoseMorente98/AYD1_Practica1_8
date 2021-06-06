import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

	constructor() { }

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
	
	// Método Agregar
	agregar(): void {
		
		
	}
	
	// Método Modificar Este Id es basicamente la posicion que tiene en la tabla de la vista pero si empezamos el id de la base desde 1 
	// basicamente seria el mismo
	modificar(Id: number): void {
		
		
	}
	
	// Método Eliminar Este Id es basicamente la posicion que tiene en la tabla de la vista pero si empezamos el id de la base desde 1 
	// basicamente seria el mismo	
	eliminar(Id: number): void {
		
		
		
	}

}