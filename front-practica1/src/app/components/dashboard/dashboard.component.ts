import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  
  columnas: string[] = ['Cui', 'Carnet', 'Nombre', 'Apellido', 'Correo_Personal', 'Correo_Institucional'];
  
  headers: string[] = ['Cui', 'Carnet', 'Nombre', 'Apellido', 'Correo_Personal', 'Correo_Institucional'];
  
  datos = [
  
			{Cui: 3162261571502, Carnet: 20180137, Nombre:"José Rafael", Apellido: "Morente González", Correo_Personal: "josemorenteg98@gmail.com", Correo_Institucional: "3162261571502@ingenieria.usac.edu.gt"}, 
			{Cui: 3012278370101, Carnet: 201807266, Nombre:"Luis Fernando", Apellido: "Velasquez Zacarias", Correo_Personal: "luis.fernando.velasquez99@gmail.com", Correo_Institucional: "3012278370101@ingenieria.usac.edu.gt"}, 
			{Cui: 2757881482208, Carnet: 201801262, Nombre:"Juan Jose", Apellido: "Ramos Campos", Correo_Personal: "eljuanjo.ramos@gmail.com", Correo_Institucional: "2757881482208@ingenieria.usac.edu.gt"},
			{Cui: 2996381970101, Carnet: 201801195, Nombre:"Jose Carlos", Apellido: "Jimenez", Correo_Personal: "jose.522.vb@gmail.com", Correo_Institucional: "2996381970101@ingenieria.usac.edu.gt"},
			{Cui: 3013072880101, Carnet: 201801628, Nombre:"Sergio Alexander", Apellido: "Echigoyen Gómez", Correo_Personal: "sergioeg19@hotmail.com", Correo_Institucional: "3013072880101@ingenieria.usac.edu.gt"}
					
		];
  
  @ViewChild(MatTable) tabla1: MatTable<any>;
  
  ngOnInit(): void {
  }

}
