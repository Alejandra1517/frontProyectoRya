import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  
  URL_API: string = 'http://localhost:8081/api'
  constructor(private httpClient: HttpClient) {

  }

  // getUsuarios(): Observable<Usuario[]> {
  //   return this.httpClient.get<Usuario[]>(this.URL_API + '/getUsers').pipe(map(res => res));
  // }


  getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<any>(`${this.URL_API}/getUsers`).pipe(
      map(response => response.usuarios)
    );
  }


  saveUsuario(request: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API + '/postUser', request).pipe(map(resp => resp));
  }

  updateUsuario(id_usuario: number, request: any): Observable<any> {
    const url = `${this.URL_API}/putUser/${id_usuario}`;
    return this.httpClient.put<any>(url, request).pipe(map(resp => resp));
  }

  deleteUsuario(id_usuario: number): Observable<any> {
    const url = `${this.URL_API}/deleteUser/${id_usuario}`;
    return this.httpClient.delete<any>(url).pipe(map(resp => resp));
  }


}
