import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit {

  categorias:any = [];

  examenData = {
    titulo:'',
    descripcion:'',
    puntosMaximos:'',
    numeroDePreguntas:'',
    activo:true,
    categoria:{
      id:''
    }
  }

  constructor(
    private categoriaService:CategoriaService,
    private snack:MatSnackBar,
    private examenService:ExamenService,
    private router:Router,
    private dialogRef: MatDialogRef<AddExamenComponent>) { }

    ngOnInit(): void {
      this.categoriaService.listarCategorias().subscribe(
        (dato:any) => {
          this.categorias = dato;
          console.log(this.categorias);
          // Agrega un log para ver el tipo de dato de categoriaId
          console.log(typeof this.categorias[0].id); 
        },
        (error) => {
          console.error('Error al cargar las categorías', error);
          Swal.fire('Error !!', 'Error al cargar los datos', 'error');
        }
      );
    }

    onCategoriaChange() {
      console.log(this.examenData.categoria.id);
    }

    guardarCuestionario() {
      if (this.examenData.titulo.trim() == '' || this.examenData.titulo == null) {
        this.snack.open('El título es requerido', '', { duration: 3000 });
        return;
      }
    
      // Guardar el cuestionario
      this.examenService.agregarExamen(this.examenData).subscribe(
        (data) => {
          Swal.fire('Test guardado', 'El test ha sido guardado con éxito', 'success').then(() => {
            // Aquí asumimos que refrescarLista manejará adecuadamente tanto exámenes por categoría como por usuario
            if (this.examenData.categoria.id) {
              this.examenService.refrescarLista(+this.examenData.categoria.id);
            } else {
              this.examenService.refrescarLista();
            }
            // Cierra el modal y pasa un indicador para refrescar.
            this.dialogRef.close('refrescar');
          });
        },
        (error) => {
          Swal.fire('Error', 'Error al guardar el test', 'error');
        }
      );
    }

  CloseModal(){
    this.dialogRef.close();
   }

}
