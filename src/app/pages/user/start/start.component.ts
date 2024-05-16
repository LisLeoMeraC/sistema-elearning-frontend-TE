import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-service.service';

import { ActivatedRoute, Router } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { YoutubeVideosComponent } from 'src/app/pages/user/youtube-videos/youtube-videos.component';
import Swal from 'sweetalert2';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {

  examenId: any;
  tituloExamen:any;
  preguntas: any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;
  timerProgress: number = 0;
  totalPreguntas: number = 0;
  puntosMaximos: number = 0;

  preguntasFallidas: any[] = [];
  videos: any[] = [];

  esEnviado = false;
  timer: any;
  catId: any;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private datosService: DatosService, // Agregar el servicio aquí
    public dialog: MatDialog,
    private sharedService: SharedService,
    private youtubeService: YoutubeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.prevenirElBotonDeRetroceso();
    this.examenId = this.route.snapshot.params['examenId'];
    this.tituloExamen= this.route.snapshot.params['titulo'];
    
    this.catId = this.route.snapshot.queryParams['catId'];
    console.log('catId en examen:', this.catId);
    console.log(this.examenId);
    this.cargarPreguntas();
    this.sharedService.cambiarTitulo(this.tituloExamen);
  }

  ngOnDestroy(): void {
    this.datosService.cambiarEstadoEnviado(false); // Restablecer el estado al salir del componente
  }

  

  cargarPreguntas() {
    this.preguntaService.listarPreguntasDelExamenParaLaPrueba(this.examenId).subscribe(
      (data: any) => {
        console.log(data);
        this.preguntas = data;
        this.totalPreguntas = this.preguntas.length;
        // Si hay preguntas, obtenemos el título del examen
        if (this.preguntas && this.preguntas.length > 0) {
          this.tituloExamen = this.preguntas[0].examen.titulo;
  
          // Aquí puedes hacer la llamada para cargar los videos relacionados, si es necesario.
          
        }
  
        this.timer = this.preguntas.length * 2 * 60;
  
        this.preguntas.forEach((p: any) => {
          p['respuestaDada'] = '';
        });
        console.log(this.preguntas);
        this.iniciarTemporizador();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las preguntas de la prueba', 'error');
      }
    );
  }
  
 

  iniciarTemporizador() {
    let tiempoTotal = this.preguntas.length * 2 * 60; // Tiempo total en segundos
    let intervalo = 1000; // Intervalo de actualización en milisegundos

    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluarExamen();
        clearInterval(t);
      } else {
        let tiempoTranscurrido = tiempoTotal - this.timer;
        this.timerProgress = (tiempoTranscurrido / tiempoTotal) * 100;
        this.timer--;
      }
    }, intervalo);
  }

  prevenirElBotonDeRetroceso() {
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null!, location.href);
    });
  }

  enviarCuestionario() {
    Swal.fire({
      title: '¿Quieres enviar el Test?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        this.evaluarExamen();
        this.datosService.cambiarEstadoEnviado(true); // Cambiar el estado aquí
      }
    });
  }

  evaluarExamen() {
    this.preguntaService.evaluarExamen(this.preguntas).subscribe(
      (data: any) => {
        console.log(data);
        this.puntosConseguidos = data.puntosMaximos;
        this.respuestasCorrectas = data.respuestasCorrectas;
        this.intentos = data.intentos;
  
        this.preguntasFallidas = data.preguntasIncorrectas;
  
        // Asignar las respuestas dadas por el usuario a preguntasFallidas
        for (let fallida of this.preguntasFallidas) {
          // @ts-ignore
          let preguntaOriginal = this.preguntas.find(p => p.preguntaId === fallida.preguntaId); // Asume que cada pregunta tiene un 'preguntaId'
          if (preguntaOriginal) {
            console.log("Pregunta Original: ", preguntaOriginal);
            console.log("Respuesta dada: ", preguntaOriginal.respuestaDada);
            fallida.respuestaDada = preguntaOriginal.respuestaDada; // Asume que 'respuestaDada' es donde se almacena la respuesta seleccionada por el usuario
            fallida.url = preguntaOriginal.url;
          }
        }
  
        this.esEnviado = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  
  

  obtenerHoraFormateada() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} seg`;
  }

  imprimirPagina() {
    window.print();
  }
  abrirVideos() {
    this.dialog.open(YoutubeVideosComponent, {
      width: '700px',
      height: '500px',
      data: { tema: this.tituloExamen } // envía el título del examen como data
    });
  }

  salirCuestionario() {
    Swal.fire({
      title: '¿Estás seguro de que deseas salir del cuestionario?',
      text: 'No se guardarán tus respuestas.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/user-dashboard/load-examen/',+ this.catId]);
      }
    });
  }
}
