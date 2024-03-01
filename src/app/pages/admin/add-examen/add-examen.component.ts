import { Component, OnInit } from '@angular/core';
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
    private router:Router) { }

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

  guardarCuestionario(){
    console.log(this.examenData);
    if(this.examenData.titulo.trim() == '' || this.examenData.titulo == null){
      this.snack.open('El título es requerido','',{
        duration:3000
      });
      return ;
    }

    this.examenService.agregarExamen(this.examenData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Test guardado','El test ha sido guardado con éxito','success');
        this.examenData = {
          titulo : '',
          descripcion : '',
          puntosMaximos : '',
          numeroDePreguntas : '',
          activo:true,
          categoria:{
            id:''
          }
        }
        this.router.navigate(['/admin/cuestionarios']);
        
      },
      (error) => {
        Swal.fire('Error','Error al guardar el test','error');
      }
    )
  }

}
