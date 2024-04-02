import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';
import { AddCategoriaComponent } from '../add-categoria/add-categoria.component';

@Component({
  selector: 'app-view-categoria',
  templateUrl: './view-categoria.component.html',
  styleUrls: ['./view-categoria.component.css']
})
export class ViewCategoriaComponent {
  
  categorias:any = [

  ]

  constructor(private categoriaService:CategoriaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar las categorias','error');
      }
    )
  }

  openAsignaturaModal() {
    const dialogRef = this.dialog.open(AddCategoriaComponent, {
      width: '500px', // ajusta el ancho según tus necesidades
      // otras propiedades como height, data, etc.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
      // Vuelve a listar las asignaturas después de cerrar el modal
      this.listarAsignaturas();
    });
  }


  listarAsignaturas() {
    this.categoriaService.listarCategorias().subscribe(
      (dato: any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al cargar las categorias', 'error');
      }
    );
  }
}
