import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Obra } from '../models/obra';
import { map } from 'rxjs/operators';

@Injectable()
export class Obraservice {

    URL_API: string = 'http://localhost:8081/api'
    constructor(private httpClient: HttpClient) {
  
    }
  


    getObras(): Observable<Obra[]> {
      return this.httpClient.get<any>(`${this.URL_API}/getObras`).pipe(
        map(response => response.obras)
      );
    }


  
    saveObra(request: any): Observable<any> {
      return this.httpClient.post<any>(this.URL_API + '/postObra', request).pipe(map(resp => resp));
    }
  
    updateObra(id_Obra: number, request: any): Observable<any> {
      const url = `${this.URL_API}/putObra/${id_Obra}`;
      return this.httpClient.put<any>(url, request).pipe(map(resp => resp));
    }
  
    deleteObra(id_Obra: string): Observable<any> {
      const url = `${this.URL_API}/deleteObra/${id_Obra}`;
      return this.httpClient.delete<any>(url).pipe(map(resp => resp));
    }


    deleteAllObras(): Observable<any> {
      const url = `${this.URL_API}/deleteAllObras`;
      return this.httpClient.delete<any>(url);
    }
    


}
