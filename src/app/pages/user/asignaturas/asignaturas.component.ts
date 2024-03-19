import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent {

  codigoAcceso: string = '';

  categorias:any = [

  ]

  constructor(private categoriaService:CategoriaService, private router: Router) { }

  verRecursos(idCategoria: number) {
    // Navegar al componente que muestra los recursos pasando el ID de categoría
    this.router.navigate(['/user-dashboard/view-recursos', idCategoria]);
  }

  verCuestionarios(idCategoria: number) {
    // Navegar al componente que muestra los recursos pasando el ID de categoría
    this.router.navigate(['/user-dashboard/load-examen', idCategoria]);
  }


  ngOnInit(): void {
    this.categoriaService.listartodasCategorias().subscribe(
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

  verificarCodigo() {
    this.categoriaService.verificarCodigo(this.codigoAcceso)
        .subscribe(
            () => {
              Swal.fire('Error !!','Se ha aregistrado correctamente','error');
             },
            error => { /* Manejar el error */ }
        )
}


}
