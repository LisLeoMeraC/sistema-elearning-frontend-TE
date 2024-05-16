import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import baseURL from './services/helper';
import { RecursosSharedService } from './services/recursos-shared.service';



@Injectable({
  providedIn: 'root'
})
export class RecursoServiceService {

 

  constructor(private http: HttpClient,  private recursosSharedService: RecursosSharedService) { }

  subirArchivo(archivo: File, categoriaId: number): Observable<any> { // Asegúrate de que el método devuelva un Observable
    const formData = new FormData();
    formData.append('file', archivo, archivo.name);
    formData.append('categoriaId', categoriaId.toString());

    return this.http.post(`${baseURL}/archivos/subir`, formData, { responseType: 'text' })
      .pipe(
        tap(() => {
          // Notificar al servicio compartido después de subir un nuevo archivo
          this.recursosSharedService.notificarRecursoAgregado();
        })
      );
  }

  getArchivosPorCategoria(idCategoria: number): Observable<any> {
    return this.http.get(`${baseURL}/archivos/categoria/${idCategoria}`);
  }

  descargarArchivo(id: number): Observable<any> {
    return this.http.get(`${baseURL}/archivos/${id}/descargar`, { responseType: 'blob' });
  }

  getTodosLosRecursos(): Observable<any> {
    return this.http.get(`${baseURL}/archivos/listar`);
  }

  eliminarArchivo(id: number): Observable<any> {
    return this.http.delete(`${baseURL}/archivos/${id}`, { responseType: 'text' });
  }
}
