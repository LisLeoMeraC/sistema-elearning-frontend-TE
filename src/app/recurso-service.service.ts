import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoServiceService {

  private baseUrl = 'http://localhost:8080/archivos';
  private viewRecursos= 'http://localhost:8080/archivos/categoria'

  constructor(private http: HttpClient) { }

  subirArchivo(archivo: File, categoriaId: number) {
    const formData = new FormData();
    formData.append('file', archivo, archivo.name);
    formData.append('categoriaId', categoriaId.toString());

    return this.http.post(`${this.baseUrl}/subir`, formData, { responseType: 'text' });
  }

  getArchivosPorCategoria(idCategoria: number): Observable<any> {
    return this.http.get(`${this.viewRecursos}/${idCategoria}`);
  }
}
