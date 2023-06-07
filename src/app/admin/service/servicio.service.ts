import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Servicio } from '../models/servicios';

@Injectable({
  providedIn: 'root'
})
export class ServicioServiceService {



  
  URL_API: string = 'http://localhost:8080/clients'
  constructor(private httpClient: HttpClient) {

  }

  getServicio(): Observable<Servicio[]> {
    return this.httpClient.get<Servicio[]>(this.URL_API + '/getServices').pipe(map(res => res));
  }

  saveServicio(request: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API + '/postService', request).pipe(map(resp => resp));
  }

  updateServicio(id_service: number, request: any): Observable<any> {
    const url = `${this.URL_API}/putService/${id_service}`;
    return this.httpClient.put<any>(url, request).pipe(map(resp => resp));
  }

  deleteServicio(id_service: number): Observable<any> {
    const url = `${this.URL_API}/deleteServicio/${id_service}`;
    return this.httpClient.delete<any>(url).pipe(map(resp => resp));
  }




}
