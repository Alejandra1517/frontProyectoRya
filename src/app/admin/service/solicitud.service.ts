import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud';
import { map } from 'rxjs/operators';

@Injectable()
export class Solicitudeservice {

    URL_API: string = 'http://localhost:8081/api'
    constructor(private httpClient: HttpClient) {
  
    }
  


    getSolicitudes(): Observable<Solicitud[]> {
      return this.httpClient.get<any>(`${this.URL_API}/getSolicitudes`).pipe(
        map(response => response.solicitudes)
      );
    }


  
    saveSolicitud(request: any): Observable<any> {
      return this.httpClient.post<any>(this.URL_API + '/postSolicitud', request).pipe(map(resp => resp));
    }
  
    updateSolicitud(id_Solicitud: number, request: any): Observable<any> {
      const url = `${this.URL_API}/putSolicitud/${id_Solicitud}`;
      return this.httpClient.put<any>(url, request).pipe(map(resp => resp));
    }
  
    deleteSolicitud(id_Solicitud: string): Observable<any> {
      const url = `${this.URL_API}/deleteSolicitud/${id_Solicitud}`;
      return this.httpClient.delete<any>(url).pipe(map(resp => resp));
    }


    deleteSolicitudes(): Observable<any> {
      const url = `${this.URL_API}/deleteAllSolicitudes`;
      return this.httpClient.delete<any>(url).pipe(map(resp => resp));
    }


    deleteAllSolicitudes(): Observable<any> {
      const url = `${this.URL_API}/deleteAllSolicitudes`;
      return this.httpClient.delete<any>(url);
    }
    


}
