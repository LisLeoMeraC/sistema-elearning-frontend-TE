import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css']
})
export class ActualizarExamenComponent implements OnInit {

  examenOriginal:any;
  examenId = 0;
  examen:any;
  categorias:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route:ActivatedRoute,
    private examenService:ExamenService,
    private categoriaService:CategoriaService,
    private router:Router,
    public dialogRef: MatDialogRef<ActualizarExamenComponent>,) { }

 

  ngOnInit(): void {
    this.examenOriginal=this.data.examen;
    this.examen = JSON.parse(JSON.stringify(this.examenOriginal));
    console.log('Examen recibido en el modal:', this.examen);
    this.cargarCategorias();
  }

  private cargarExamen(examenId: number): void {
    this.examenService.obtenerExamen(examenId).subscribe(
      (data) => {
        this.examen = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los datos del examen', 'error');
      }
    );
  }

  private cargarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las categorías', 'error');
      }
    );
  }

  public actualizarDatos() {
    this.examenService.actualizarExamen(this.examen).subscribe(
      (data) => {
        Object.assign(this.examenOriginal, this.examen);
        Swal.fire('Test actualizado', 'El Test ha sido actualizado con éxito', 'success').then(
          (e) => {
            if (this.examen.categoria && this.examen.categoria.id) {
              this.examenService.refrescarLista();
            } else {
              this.examenService.refrescarLista(this.examen.categoria.id);
            }
            this.dialogRef.close('actualizar'); // Asegúrate de que estás pasando este string al cerrar el modal.
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar el test', 'error');
        console.log(error);
      }
    );
  }

  CloseModal(){
    this.dialogRef.close();
   }
}
