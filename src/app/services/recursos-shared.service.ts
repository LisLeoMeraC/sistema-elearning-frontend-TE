import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursosSharedService {

  constructor() { }

  private recursoAgregadoSource = new Subject<void>();

  recursoAgregado$ = this.recursoAgregadoSource.asObservable();

  notificarRecursoAgregado() {
    this.recursoAgregadoSource.next();
  }
}
