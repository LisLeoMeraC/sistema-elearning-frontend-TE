import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  public listarCategorias(){
    return this.http.get(`${baserUrl}/categoria/`);
  }

  public agregarCategoria(categoria:any){
    return this.http.post(`${baserUrl}/categoria/`,categoria);
  }

  public listartodasCategorias(){
    return this.http.get(`${baserUrl}/categoria/usuario-logueado`);
  }

  public verificarCodigo(codigoAcceso: string) {
    const params = new HttpParams().set('codigoAcceso', codigoAcceso);
    return this.http.post(`${baserUrl}/categoria/verificar`, params);
  }
}

