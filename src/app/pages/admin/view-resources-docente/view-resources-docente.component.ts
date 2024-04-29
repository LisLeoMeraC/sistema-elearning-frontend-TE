import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecursoServiceService } from 'src/app/recurso-service.service';
import { RecursosEducativosComponent } from '../recursos-educativos/recursos-educativos.component';
import { ActivatedRoute } from '@angular/router';

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
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Capturar el parámetro id de la ruta
    this.route.params.subscribe(params => {
      this.idCategoria = +params['id']; // El '+' convierte el valor a número
      if (this.idCategoria) {
        this.cargarRecursos(this.idCategoria);
      }
    });
  }

  cargarRecursos(idCategoria: number) {
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


  openAddRecursosModal() {
    const dialogRef = this.dialog.open(RecursosEducativosComponent, {
      width: '700px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('El modal se cerró');
      this.cargarRecursos(1); // Recarga los recursos al cerrar el modal
    });
  }

  convertirTamanoA_MB(tamanoEnBytes: number): number {
    return tamanoEnBytes / 1024 / 1024;
  }

}
