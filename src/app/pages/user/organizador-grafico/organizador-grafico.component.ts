import { Component } from '@angular/core';
import { interval, take } from 'rxjs';
import { ChatgptService } from 'src/app/services/chatgpt.service';
import Swal from 'sweetalert2';

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

  //atributos para el segundo mapa
  subtema1: string='';
  contSubtema1: string='';

  subtema2: string='';
  contSubtema2: string='';

  subtema3: string='';
  contSubtema3: string='';

  subtema4: string='';
  contSubtema4: string='';

  subtema5: string='';
  contSubtema5: string='';

  subtema6: string='';
  contSubtema6: string='';

  

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
              Swal.fire('Error !!','Hubo un inconveniente con la generacion del organizador gráfico, Por Favor, intente de nuevo','error');
            }
          } else {
            console.error('No se encontró el contenido generado en la respuesta.');
            Swal.fire('Error !!','Hubo un inconveniente con la generacion del organizador gráfico, Por Favor, intente de nuevo','error');
          }
        } else {
          console.error('La respuesta generada no tiene el formato esperado.', response);
          Swal.fire('Error !!','Hubo un inconveniente con la generacion del organizador gráfico, Por Favor, intente de nuevo','error');
        }
      },
      error => {
        console.error('Ocurrió un error al generar el contenido:', error);
        Swal.fire('Error !!','Hubo un inconveniente con la generacion del organizador gráfico, Por Favor, intente de nuevo','error');
        this.loading = false;
      }
    );

    console.log(this.contenido1);
    
  }


  generarContenido2(): void {
    this.loading = true; 
    this.showMap = false;
  
    setTimeout(() => {
      this.loading = false;
    }, 10000);
  
    this.chatgptService.generateContent2(this.tema, this.asignatura).subscribe(
      response => {
        if (response && response.choices && response.choices.length > 0 && response.choices[0].message) {
          const generatedContent = response.choices[0].message.content;
          if (generatedContent) {
            console.log(generatedContent);
            const contents = generatedContent.split('\n\n');
            let paragraphs: string[] = [];
  
            contents.forEach((content: string) => {
              const subtopics = content.split('\n');
              paragraphs = paragraphs.concat(subtopics.filter(subtopic => subtopic.trim() !== ''));
            });
  
            if (paragraphs.length >= 12) {
              this.subtema1 = paragraphs[0];
              this.contSubtema1 = paragraphs[1];
              this.subtema2 = paragraphs[2];
              this.contSubtema2 = paragraphs[3];
              this.subtema3 = paragraphs[4];
              this.contSubtema3 = paragraphs[5];
              this.subtema4 = paragraphs[6];
              this.contSubtema4 = paragraphs[7];
              this.subtema5 = paragraphs[8];
              this.contSubtema5 = paragraphs[9];
              this.subtema6 = paragraphs[10];
              this.contSubtema6 = paragraphs[11];
              this.contenidoGenerado = true;
              setTimeout(() => {
                this.loading = false;
                this.showMap = true;
              }, 5000);
            } else {
              console.error('La respuesta generada no tiene suficientes párrafos.');
              Swal.fire('Error !!','Hubo un inconveniente con la generacion del organizador gráfico, Por Favor, intente de nuevo','error');
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