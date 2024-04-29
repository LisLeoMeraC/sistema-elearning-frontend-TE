import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private examenesPorCategoriaSource = new BehaviorSubject<any[]>([]);
  public examenesPorCategoria$ = this.examenesPorCategoriaSource.asObservable();

  private examenesPorUsuarioSource = new BehaviorSubject<any[]>([]);
  public examenesPorUsuario$ = this.examenesPorUsuarioSource.asObservable();



  constructor(private http:HttpClient) { }

  public listarCuestionarios(){
    return this.http.get(`${baserUrl}/examen/`);
  }

  public agregarExamen(examen:any){
    return this.http.post(`${baserUrl}/examen/`,examen);
  }

  public eliminarExamen(examenId:any){
    return this.http.delete(`${baserUrl}/examen/${examenId}`);
  }

  public obtenerExamen(examenId:any){
    return this.http.get(`${baserUrl}/examen/${examenId}`);
  }

  public actualizarExamen(examen:any){
    return this.http.put(`${baserUrl}/examen/`,examen);
  }

  public listarExamenesDeUnaCategoria(categoriaId: number): Observable<any[]> {
    // Devuelve el observable directamente en lugar de suscribirte aquí.
    return this.http.get<any[]>(`${baserUrl}/examen/categoria/${categoriaId}`);
  }
  


  public obtenerExamenesActivos(){
    return this.http.get(`${baserUrl}/examen/activo`);
  }

  public obtenerExamenesActivosDeUnaCategoria(categoriaId:any){
    return this.http.get(`${baserUrl}/examen/categoria/activo/${categoriaId}`);
  }


  //listar examenes por docente 
  public listarCuestionariosPorUsuario() {
    return this.http.get(`${baserUrl}/examen/usuario`);
  }


  //Refrescar Lista
  public refrescarExamenesDeUnaCategoria(categoriaId: number) {
    this.http.get<any[]>(`${baserUrl}/examen/categoria/${categoriaId}`).subscribe(
      examenes => this.examenesPorCategoriaSource.next(examenes),
      error => console.error('Error al cargar los examenes de la categoría', error)
    );
  }

  // Método para refrescar los examenes de un usuario específico
  public refrescarCuestionariosPorUsuario() {
    this.http.get<any[]>(`${baserUrl}/examen/usuario`).subscribe(
      examenes => this.examenesPorUsuarioSource.next(examenes),
      error => console.error('Error al cargar los examenes del usuario', error)
    );
  }

  // Método general para refrescar la lista basado en el contexto
  public refrescarLista(categoriaId?: number) {
    if (categoriaId) {
      this.refrescarExamenesDeUnaCategoria(categoriaId);
    } else {
      this.refrescarCuestionariosPorUsuario();
    }
  }
}