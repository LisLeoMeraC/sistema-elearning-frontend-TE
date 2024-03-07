import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoServiceService {

  private baseUrl = 'https://sistemaelearning-backendte-1.onrender.com/archivos';
  private viewRecursos= 'https://sistemaelearning-backendte-1.onrender.com/categoria'

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
