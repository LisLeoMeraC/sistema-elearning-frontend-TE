import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecursoServiceService } from 'src/app/recurso-service.service';
import { RecursosEducativosComponent } from '../recursos-educativos/recursos-educativos.component';
import { ActivatedRoute } from '@angular/router';
import { RecursosSharedService } from 'src/app/services/recursos-shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-resources-docente',
  templateUrl: './view-resources-docente.component.html',
  styleUrl: './view-resources-docente.component.css'
})
export class ViewResourcesDocenteComponent implements OnInit {
  recursosPorCategoria: any[] = [];
  loading: boolean = false;
  idCategoria: number | undefined;

  constructor(
    private recursoService: RecursoServiceService,
    private recursosSharedService: RecursosSharedService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Capturar el parámetro id de la ruta
    this.route.params.subscribe(params => {
      this.idCategoria = +params['id']; // El '+' convierte el valor a número
      if (this.idCategoria) {
        this.cargarRecursosPorCategoria(this.idCategoria);
      }else{
        this.cargarTodosLosRecursos();
        
      }
    });
  }

  cargarRecursosPorCategoria(idCategoria: number) {
    this.loading = true;
    this.recursoService.getArchivosPorCategoria(idCategoria).subscribe({
      next: (recursos) => {
        this.recursosPorCategoria = recursos;
        this.loading = false;
        console.log(recursos);
        console.log(this.recursosPorCategoria);
      },
      error: (error) => {
        console.error('Error al obtener recursos', error);
        this.loading = false;
      }
    });
  }
  cargarTodosLosRecursos() {
    this.loading = true;
    this.recursoService.getTodosLosRecursos().subscribe({
      next: (recursos) => {
        this.recursosPorCategoria = recursos;
        this.loading = false;
        console.log(recursos);
      },
      error: (error) => {
        console.error('Error al obtener todos los recursos', error);
        this.loading = false;
      }
    });

    this.recursosSharedService.recursoAgregado$.subscribe(() => {
      // Actualizar la lista de recursos
      if (this.idCategoria) {
        this.cargarRecursosPorCategoria(this.idCategoria);
      } else {
        this.cargarTodosLosRecursos();
      }
    });
  }


  openAddRecursosModal() {
    const dialogRef = this.dialog.open(RecursosEducativosComponent, {
      width: '700px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      console.log('El modal se cerró');
      if (success) {
        if (this.idCategoria) {
          this.cargarRecursosPorCategoria(this.idCategoria);
        } else {
          this.cargarTodosLosRecursos();
        }
      }
    });
  }

  convertirTamanoA_MB(tamanoEnBytes: number): number {
    return tamanoEnBytes / 1024 / 1024;
  }

  descargarArchivo(id: number) {
    this.recursoService.descargarArchivo(id).subscribe((data: Blob) => {

      const randomString = Math.random().toString().slice(2,12);
      // Crea un enlace en el documento
      const a = document.createElement('a');
      const objectUrl = window.URL.createObjectURL(data);
  
      // Utiliza el nombre del archivo original cuando lo asignas
      a.href = objectUrl;
      a.download = `archivo_${randomString}`;// Aquí deberías poner el nombre real del archivo que deseas.
      document.body.appendChild(a); // Añade el enlace al documento
      a.click();
      window.URL.revokeObjectURL(objectUrl); // Limpia la URL del objeto Blob
      a.remove(); // Elimina el enlace una vez que se ha hecho clic
    });
  }

  eliminarArchivo(id: number) {
    Swal.fire({
      title: 'Eliminar Archivo',
      text: '¿Estás seguro de eliminar este archivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.recursoService.eliminarArchivo(id).subscribe(
          (response) => {
            // Eliminar el archivo de la lista de recursos solo si se elimina correctamente
            if (response.includes('eliminado exitosamente')) {
              this.recursosPorCategoria = this.recursosPorCategoria.filter(recurso => recurso.id !== id);
              Swal.fire('Archivo Eliminado', 'El archivo ha sido eliminado exitosamente', 'success');
            } else {
              console.error('Error al eliminar el archivo:', response);
              Swal.fire('Error', 'Hubo un error al eliminar el archivo', 'error');
            }
  
            // Recargar los recursos después de la eliminación del archivo
            if (this.idCategoria) {
              this.cargarRecursosPorCategoria(this.idCategoria);
            } else {
              this.cargarTodosLosRecursos();
            }
          },
          error => {
            console.error('Error al eliminar el archivo:', error);
            Swal.fire('Error', 'Hubo un error al eliminar el archivo', 'error');
          }
        );
      }
    });
  }

}
