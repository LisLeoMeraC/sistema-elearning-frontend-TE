import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';
import { AddCategoriaComponent } from '../add-categoria/add-categoria.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-categoria',
  templateUrl: './view-categoria.component.html',
  styleUrls: ['./view-categoria.component.css']
})
export class ViewCategoriaComponent {
  
  categorias:any = [

  ]

  constructor(private categoriaService:CategoriaService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.listarAsignaturas();
  }

  listarAsignaturas() {
    this.categoriaService.listarCategorias().subscribe(
      (dato: any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al cargar las categorias', 'error');
      }
    );
  }



  openAsignaturaModal() {
    const dialogRef = this.dialog.open(AddCategoriaComponent, {
      width: '500px', // ajusta el ancho según tus necesidades
      // otras propiedades como height, data, etc.
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('El modal se cerró');
      // Vuelve a listar las asignaturas después de cerrar el modal
      this.listarAsignaturas();
    });
  }


  verCuestionariosPorCategoria(idCategoria: number) {
    // Navegar al componente que muestra los recursos pasando el ID de categoría
    this.router.navigate(['/admin/view-cuestionarios', idCategoria]);
  }

  verRecursosPorCategoria(idCategoria: number) {
    // Navegar al componente que muestra los recursos pasando el ID de categoría
    this.router.navigate(['admin/view-recursos', idCategoria]);
  }
  

  
}
