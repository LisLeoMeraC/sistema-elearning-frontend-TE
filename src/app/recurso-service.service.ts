import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseURL from './services/helper';



@Injectable({
  providedIn: 'root'
})
export class RecursoServiceService {

 

  constructor(private http: HttpClient) { }

  subirArchivo(archivo: File, categoriaId: number) {
    const formData = new FormData();
    formData.append('file', archivo, archivo.name);
    formData.append('categoriaId', categoriaId.toString());

    return this.http.post(`${baseURL}/archivos/subir`, formData, { responseType: 'text' });
  }

  getArchivosPorCategoria(idCategoria: number): Observable<any> {
    return this.http.get(`${baseURL}/archivos/categoria/${idCategoria}`);
  }

  descargarArchivo(id: number): Observable<any> {
    return this.http.get(`${baseURL}/archivos/${id}/descargar`, { responseType: 'blob' });
  }
}
