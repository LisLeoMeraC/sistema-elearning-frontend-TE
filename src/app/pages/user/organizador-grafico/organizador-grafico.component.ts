import { Component } from '@angular/core';
import { interval, take } from 'rxjs';
import { ChatgptService } from 'src/app/services/chatgpt.service';

@Component({
  selector: 'app-organizador-grafico',
  templateUrl: './organizador-grafico.component.html',
  styleUrls: ['./organizador-grafico.component.css']
})
export class OrganizadorGraficoComponent {
  showMap: boolean = false;
  organizadorSeleccionado: number = 1;

  toggleMap() {
    this.showMap = !this.showMap;
  }
  loading: boolean = false;
  tema: string='';
  asignatura: string='';
  contenido1: string = '';
  contenido2: string = '';
  contenido3: string = '';
  contenido4: string = '';
  contenido5: string = '';
  contenidoGenerado: boolean = false;

  constructor(private chatgptService: ChatgptService){}
    
  generarContenido(): void {
    this.loading = true; 
    this.showMap=false;

    setTimeout(() => {
      this.loading = false;
    }, 10000);
  

    this.chatgptService.generateContent(this.tema, this.asignatura).subscribe(
      response => {
        if (response && response.choices && response.choices.length > 0 && response.choices[0].message) {
          
          const generatedContent = response.choices[0].message.content;
    
          if (generatedContent) {
            console.log('Contenido generado:', generatedContent);
            const contents = generatedContent.split('\n\n');
            if (contents.length >= 5) {
              this.contenido1 = contents[0];
              this.contenido2 = contents[1];
              this.contenido3 = contents[2];
              this.contenido4 = contents[3];
              this.contenido5 = contents[4];
              this.contenidoGenerado = true;

            
              console.log(this.contenido1);
              setTimeout(() => {
                this.loading = false;
                this.showMap = true;
              }, 5000);

            } else {
              console.error('La respuesta generada no tiene suficientes párrafos.');
            }
          } else {
            console.error('No se encontró el contenido generado en la respuesta.');
          }
        } else {
          console.error('La respuesta generada no tiene el formato esperado.', response);
        }
      },
      error => {
        console.error('Ocurrió un error al generar el contenido:', error);
        this.loading = false;
      }
    );

    console.log(this.contenido1);
    
  }

  ocultarMapa(): void {
    this.showMap = false;
  }

  toggleMapa(organizador: number) {
    this.showMap = true;
    this.organizadorSeleccionado = organizador;
  }

  resetMap() {
    this.showMap = false; 
    this.tema = ''; 
    this.asignatura = ''; 
    this.organizadorSeleccionado = 1; 
    this.contenido1 = ''; 
    this.contenido2 = '';
    this.contenido3 = '';
    this.contenido4 = '';
    this.contenido5 = '';
  }
}