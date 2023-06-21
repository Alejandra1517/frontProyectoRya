import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rol } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class RolService {



  
  URL_API: string = 'http://localhost:8081/api'
  constructor(private httpClient: HttpClient) {

  }

  // getRols(): Observable<Rol[]> {
  //   return this.httpClient.get<Rol[]>(this.URL_API + '/getUsers').pipe(map(res => res));
  // }


  getRoles(): Observable<Rol[]> {
    return this.httpClient.get<any>(`${this.URL_API}/getRoles`).pipe(
      map(response => response.roles)
    );
  }


  saveRol(request: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API + '/postRol', request).pipe(map(resp => resp));
  }

  updateRol(id_usuario: string, request: any): Observable<any> {
    const url = `${this.URL_API}/putRol/${id_usuario}`;
    return this.httpClient.put<any>(url, request).pipe(map(resp => resp));
  }

  deleteRol(id_usuario: string): Observable<any> {
    const url = `${this.URL_API}/deleteRol/${id_usuario}`;
    return this.httpClient.delete<any>(url).pipe(map(resp => resp));
  }


}
