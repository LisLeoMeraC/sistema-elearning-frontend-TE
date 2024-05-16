import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css']
})
export class InstruccionesComponent implements OnInit {

  examenId:any;
  examen:any = new Object();
  catId: any;

  constructor(
    private examenService:ExamenService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.catId = this.route.snapshot.queryParams['catId'];
    console.log('catId en instrucciones:', this.catId);
    this.examenService.obtenerExamen(this.examenId).subscribe(
      (data:any) => {
        console.log(data);
        this.examen = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  empezarExamen(){
    Swal.fire({
      title:'¿Quieres comenzar el test?',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Empezar',
      icon:'info'
    }).then((result:any) => {
      if(result.isConfirmed){
        this.router.navigate(['/start/'+this.examenId], { queryParams: { catId: this.catId } });
      }
    })
  }

  regresar() {
    this.router.navigate(['/user-dashboard/load-examen/',+ this.catId]);
  }
}
