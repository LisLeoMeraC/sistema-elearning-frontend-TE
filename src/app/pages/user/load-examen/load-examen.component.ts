import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css']
})
export class LoadExamenComponent implements OnInit {

  catId:any;
  examenes:any;

  constructor(
    private route:ActivatedRoute,
    private examenService:ExamenService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const catId = params['id']; // Obtén el ID de la categoría de los parámetros de la ruta
      this.catId = params['id']; // Asigna el ID de la categoría de los parámetros de la ruta
      console.log('catId:', this.catId); // Verifica el valor de catId
      console.log("Cargando todos las evaluaciones");
      this.examenService.obtenerExamenesActivosDeUnaCategoria(catId).subscribe(
        (data) => {
          console.log("Respuesta completa: ", data);
          this.examenes = data;
        },
        (error) => {
          console.log(error);
        }
      );
    });

  }

}
