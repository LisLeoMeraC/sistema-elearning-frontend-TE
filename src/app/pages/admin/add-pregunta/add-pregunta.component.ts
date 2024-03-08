import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { ChatgptService } from 'src/app/services/chatgpt.service';
import Swal from 'sweetalert2';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css'],
})
export class AddPreguntaComponent implements OnInit {
  examenId: any;
  titulo: any;
  numeroDePreguntasActuales: number = 0;
  preguntasAgregadas: number = 0;
  showField = false; 
  

  isButtonDisabled: boolean = false;
  pregunta: any = {
    examen: {},
    contenido: '',
    opcion1: '',
    opcion2: '',
    opcion3: '',
    opcion4: '',
    respuesta: '',
    justificacion:'',
    url: '',
  };

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private chatgptService: ChatgptService,
    private examenService: ExamenService
  ) {}

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.pregunta.examen['examenId'] = this.examenId;

    // Obtener el examen actual desde la API
    this.examenService.obtenerExamen(this.examenId).subscribe(
      (data: any) => {
        this.numeroDePreguntasActuales = parseInt(data.numeroDePreguntas, 10);
        console.log('Número de preguntas actuales:', this.numeroDePreguntasActuales); // Imprimir en la consola
        console.log('Respuesta del servidor:', data);
      
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formSubmit() {
    if (this.preguntasAgregadas >= this.numeroDePreguntasActuales) { // Cambia el 10 al número máximo de preguntas que quieres permitir
      Swal.fire(
        'Límite alcanzado',
        'Has alcanzado el número máximo de preguntas para este examen.',
        'warning'
      );
      return;
    }

    if (
      this.pregunta.contenido.trim() == '' ||
      this.pregunta.contenido == null
    ) {
      return;
    }
    if (this.pregunta.opcion1.trim() == '' || this.pregunta.opcion1 == null) {
      return;
    }
    if (this.pregunta.opcion2.trim() == '' || this.pregunta.opcion2 == null) {
      return;
    }
    if (this.pregunta.opcion3.trim() == '' || this.pregunta.opcion3 == null) {
      return;
    }
    if (this.pregunta.opcion4.trim() == '' || this.pregunta.opcion4 == null) {
      return;
    }
    if (
      this.pregunta.respuesta.trim() == '' ||
      this.pregunta.respuesta == null
    ) {
      return;
    }

    if (
      this.pregunta.justificacion.trim() == '' ||
      this.pregunta.justificacion == null
    ) {
      return;
    }


    this.preguntaService.guardarPregunta(this.pregunta).subscribe(
      (data) => {
        this.preguntasAgregadas++;
        Swal.fire(
          'Pregunta guardada',
          'La pregunta ha sido agregada con éxito',
          'success'
        );
        this.pregunta.contenido = '';
        this.pregunta.opcion1 = '';
        this.pregunta.opcion2 = '';
        this.pregunta.opcion3 = '';
        this.pregunta.opcion4 = '';
        this.pregunta.respuesta = '';
        this.pregunta.justificacion='',
        this.pregunta.url='';
      },
      
      (error) => {
        Swal.fire(
          'Error',
          'Error al guardar la pregunta en la base de datos',
          'error'
        );
        console.log(error);
      }
    );
  }

  generarPregunta(): void {
    this.isButtonDisabled = true;
    this.chatgptService
      .generateQuestion(this.titulo)
      .subscribe(
        (response) => {
          if (response && response.choices && response.choices.length > 0) {
            const content = response.choices[0].message.content;
            const splitContent = content
              .split('\n')
              .filter((line: string) => line.trim() !== '');
            if (splitContent.length >= 7) {
              this.pregunta.contenido = splitContent[0]
                .replace('Pregunta: ', '')
                .trim();
              this.pregunta.opcion1 = this.extractOptionText(splitContent[1]);
              this.pregunta.opcion2 = this.extractOptionText(splitContent[2]);
              this.pregunta.opcion3 = this.extractOptionText(splitContent[3]);
              this.pregunta.opcion4 = this.extractOptionText(splitContent[4]);
              let correctAnswer = splitContent[5]
                .replace('Respuesta: ', '')
                .trim();
                this.pregunta.justificacion = splitContent[6].replace('Argumentación: ','').trim();
                
                          this.pregunta.url = splitContent[7].replace('URL: ', '').trim(); // Añade esta línea para la URL
              const answerLetter = correctAnswer.charAt(0).toUpperCase();

              switch (answerLetter) {
                case 'A':
                  this.pregunta.respuesta = this.pregunta.opcion1;
                  break;
                case 'B':
                  this.pregunta.respuesta = this.pregunta.opcion2;
                  break;
                case 'C':
                  this.pregunta.respuesta = this.pregunta.opcion3;
                  break;
                case 'D':
                  this.pregunta.respuesta = this.pregunta.opcion4;
                  break;
                default:
                  this.pregunta.respuesta = '';
                  break;
              }

              console.log('Respuesta OpenAI:', content);
              console.log(
                'Respuesta correcta asignada:',
                this.pregunta.respuesta
              );
              setTimeout(() => {
                this.isButtonDisabled = false;
              }, 5000);
            } else {
              Swal.fire(
                'Error',
                'La respuesta generada no tiene el formato esperado.',
                'error'
              );
              setTimeout(() => {
                this.isButtonDisabled = false;
              }, 5000);
            }
          } else {
            Swal.fire(
              'Error',
              'La respuesta no tiene el formato esperado.',
              'error'
            );
            setTimeout(() => {
              this.isButtonDisabled = false;
            }, 5000);
          }
        },
        (error) => {
          console.error('Error detalle de la :', error);
          Swal.fire(
            'Error',
            'Ocurrió un error al obtener la pregunta: ' + error.message,
            'error'
          );
          this.isButtonDisabled = false;
        }
      );
  }

  private extractOptionText(option: string): string {
    const idx = option.indexOf(')');
    if (idx !== -1 && idx + 2 <= option.length) {
      return option.substring(idx + 2).trim();
    }
    return option;
  }
}

