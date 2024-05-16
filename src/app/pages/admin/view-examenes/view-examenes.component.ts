import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';
import { AddExamenComponent } from '../add-examen/add-examen.component';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Subscription } from 'rxjs';
import { ActualizarExamenComponent } from '../actualizar-examen/actualizar-examen.component';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit, OnDestroy{
  private subscription: Subscription = new Subscription();
  categoriaActual: number | null = null;
  categoriaId: number | null = null;
  examenes : any = [];
  nombreABuscar: string = '';
  examenesFiltrados: any[] = [];
  examenesCategoria:any=[];

  constructor(private examenService:ExamenService, 
    private dialog: MatDialog, 
    private route: ActivatedRoute,
    private categoriaService:CategoriaService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.categoriaId = +params['id']; // Almacenar el ID de categoría actual
          this.examenService.listarExamenesDeUnaCategoria(this.categoriaId).subscribe(
            examenes => this.examenesCategoria = examenes,
            // Manejo de errores aquí
          );
        } else {
          this.categoriaId = null; // Asegúrate de restablecer el ID de categoría si no estás en una categoría
          this.listarExamenesporUsuario();
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  
  listarexamenesporAsignatura() {
    this.subscription.add(
      this.route.params.subscribe(params => {
        const idCategoria = +params['id'];
        this.examenService.listarExamenesDeUnaCategoria(idCategoria).subscribe(
          examenes => {
            this.examenesCategoria = examenes;
          },
          error => {
            console.error('Error al cargar los examenes de la categoría', error);
            Swal.fire('Error', 'Error al cargar los test', 'error');
          }
        );
      })
    );
  }

  listarExamenesporUsuario(){
    this.examenService.listarCuestionariosPorUsuario().subscribe(
      (dato:any) => {
        this.examenes = dato;
        this.examenesCategoria = dato;
        console.log(this.examenes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar los test','error');
      }
    )
  }


  filtrarExamenes() {
    this.examenesFiltrados = this.examenes.filter((examen: any) =>
      examen.titulo.toLowerCase().includes(this.nombreABuscar.toLowerCase())
    );
  }

  eliminarExamen(examenId:any){
    Swal.fire({
      title:'Eliminar Test',
      text:'¿Estás seguro de eliminar el test?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.examenService.eliminarExamen(examenId).subscribe(
          (data) => {
            this.examenes = this.examenes.filter((examen:any) => examen.examenId != examenId);
            Swal.fire('Test eliminado','El test ha sido eliminado de la base de datos','success');
            // Actualizar la tabla llamando a la función correspondiente
            if (this.categoriaId) {
              this.listarexamenesporAsignatura();
            } else {
              this.listarExamenesporUsuario();
            }
          },
          (error) => {
            Swal.fire('Error','Error al eliminar el test','error');
          }
        )
      }
      console.log('Tipo de examenId:', typeof examenId);
      console.log('Valor de examenId:', examenId);
    })
  }

  openAddCuestionarioModal() {
    const dialogRef = this.dialog.open(AddExamenComponent, {
      width: '510px',
      height: '545px'
      // otras configuraciones, si son necesarias
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refrescar') {
        // Suponiendo que tienes una forma de saber si estás viendo cuestionarios por categoría o por usuario
        if (this.categoriaId) {
          // Solo recargar la lista si estamos filtrando por categoría
          this.examenService.listarExamenesDeUnaCategoria(this.categoriaId).subscribe(
            examenes => this.examenesCategoria = examenes,
            // Manejo de errores aquí
          );
        }
        else{
          this.listarExamenesporUsuario();
        }
      }
    });
  }
  

  openUpdateCuestionarioModal(examen: any) {
    const dialogRef = this.dialog.open(ActualizarExamenComponent, {
      width: '510px',
      height: '545px',
      data: { examen: examen }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'actualizar') {
        if (this.categoriaId) {
          // Solo recargar la lista si estamos filtrando por categoría
          this.examenService.listarExamenesDeUnaCategoria(this.categoriaId).subscribe(
            examenes => this.examenesCategoria = examenes,
            // Manejo de errores aquí
          );
        }
        else{
          this.listarExamenesporUsuario();
        }
      }
    });
  }
  
  

  



}
