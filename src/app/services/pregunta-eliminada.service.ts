import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntaEliminadaService {
  preguntaEliminada$ = new Subject<void>();

  constructor() { }

  emitirPreguntaEliminada() {
    this.preguntaEliminada$.next();
  }

  
}
