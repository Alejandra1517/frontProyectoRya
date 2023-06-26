import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  //Gestiona el estado de inicio de sesión de la aplicación para saber si un usuario ha iniciado sesión o no  
  public loginStatusSubject = new Subject<boolean>(); //Subject es un tipo de observable permite emitir datos y permite tambien la subscripción a ellos 

  constructor(private http:HttpClient) { }

  //generamos el token
  public generateToken(loginData:any){
    return this.http.post(`${baserUrl}/generate-token`,loginData);
  }

  public getCurrentUser(){
    return this.http.get(`${baserUrl}/actual-usuario`);
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

  //cerramos sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
    return user.id_rol;

  }



  // public getRoleById(roleId: string) {
  //   return this.http.get(`${baserUrl}/roles/${roleId}`);
  // }
  


}
