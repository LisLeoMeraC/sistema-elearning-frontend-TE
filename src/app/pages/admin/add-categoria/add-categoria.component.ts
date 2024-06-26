import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from './../../../services/categoria.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {

   categoria = {
    titulo : '',
    descripcion : '',
    uniqueCode: ''
  }
  

  constructor(private CategoriaService:CategoriaService,private snack:MatSnackBar,
    private router:Router, private dialogRef: MatDialogRef<AddCategoriaComponent>) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.categoria.titulo.trim() == '' || this.categoria.titulo == null){
      this.snack.open("El título es requerido !!",'',{
        duration:3000
      })
      return ;
    }

    this.CategoriaService.agregarCategoria(this.categoria).subscribe(
      (dato:any) => {
        this.categoria.titulo = '';
        this.categoria.descripcion = '';
        this.categoria.uniqueCode='',
        Swal.fire('Categoría agregada','La categoría ha sido agregada con éxito','success');
        this.dialogRef.close();
        this.router.navigate(['/admin/asignaturas']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al guardar la categoría','error')
      }
    )
  }

  //Generar un codigo unico para cada asignatura que se registre
  generateUniqueCode(){
    this.categoria.uniqueCode=Math.random().toString(36).substr(2,9);
  }

  CloseModal(){
    this.dialogRef.close();
   }

}
