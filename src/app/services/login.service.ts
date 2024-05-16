import { Injectable } from '@angular/core';
import baseURL from './helper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http:HttpClient,private router: Router) { }

  //generamos el token
  public generateToken(loginData:any){
    return this.http.post(`${baseURL}/generate-token`,loginData);
  }

  public getCurrentUser(){
    let token = this.getToken();
    if (token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${baseURL}/actual-usuario`, {headers: headers});
  }
    return throwError('No token found');
  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerramoss sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubjec.next(false); // Si estás utilizando esto para manejar el estado de la sesión
    this.router.navigate(['']);
    return true;
  }

  //obtenemos el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  actualizarUsuario(id: number, usuarioActualizado: any): Observable<any> {
    // Elimina el campo 'authorities' del objeto 'usuarioActualizado'
    return this.http.put(`${baseURL}/usuarios/${id}`, usuarioActualizado);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${baseURL}/forgot-password`, { email });
  }

}