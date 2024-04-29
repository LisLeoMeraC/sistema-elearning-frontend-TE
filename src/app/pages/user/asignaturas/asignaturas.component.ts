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
  mensajes: any[] = [];
  mostrarModal: boolean = false;

  codigoAcceso: string = '';

  categorias:any = [

  ]

  constructor(private categoriaService:CategoriaService, private router: Router) { }

  mostrarModalCodigo() {
    this.mostrarModal = true;
  }

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
      .subscribe({
        next: () => {
          // Mensaje de éxito
          this.mensajes = [{ severity: 'success', summary: 'Éxito', detail: 'Código correcto.' }];
          this.limpiarMensajesDespuesDeTiempo();
          // Limpia el campo de texto y cierra el modal después de un tiempo
          setTimeout(() => {
            this.codigoAcceso = '';
            this.mostrarModal = false;
          }, 1000);
          // Asume que listartodasCategorias() recarga la lista de categorías
          this.listartodasCategorias();
        },
        error: error => {
          // Mensaje de error
          this.mensajes = [{ severity: 'error', summary: 'Error', detail: 'Código incorrecto'}];
          console.error('Error al verificar el código', error);
        }
      });
  }

  limpiarMensajesDespuesDeTiempo() {
    setTimeout(() => {
      this.mensajes = [];
    }, 1000);
  }

  
  
  listartodasCategorias() {
    this.categoriaService.listartodasCategorias()
      .subscribe({
        next: (categorias) => {
          this.categorias = categorias;
        },
        error: error => {
          console.error('Error al cargar las categorías', error);
          Swal.fire('Error', 'No se pudieron cargar las asignaturas', 'error');
        }
      });
  }
}

