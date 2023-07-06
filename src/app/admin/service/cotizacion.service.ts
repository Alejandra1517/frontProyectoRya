import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotizacion } from '../models/cotizacion';
import { map } from 'rxjs/operators';

@Injectable()
export class cotizacionservice {

    URL_API: string = 'http://localhost:8081/api'
    constructor(private httpClient: HttpClient) {
  
    }
  


    getCotizaciones(): Observable<Cotizacion[]> {
      return this.httpClient.get<any>(`${this.URL_API}/getcotizaciones`).pipe(
        map(response => response.Cotizaciones)
      );
    }


  
    saveCotizacion(request: any): Observable<any> {
      return this.httpClient.post<any>(this.URL_API + '/postcotizacion', request).pipe(map(resp => resp));
    }
  
    updateCotizacion(id_cotizacion: number, request: any): Observable<any> {
      const url = `${this.URL_API}/putcotizacion/${id_cotizacion}`;
      return this.httpClient.put<any>(url, request).pipe(map(resp => resp));
    }
  
    deleteCotizacion(id_cotizacion: string): Observable<any> {
      const url = `${this.URL_API}/deletecotizacion/${id_cotizacion}`;
      return this.httpClient.delete<any>(url).pipe(map(resp => resp));
    }


    deleteAllcotizaciones(): Observable<any> {
      const url = `${this.URL_API}/deleteAllcotizaciones`;
      return this.httpClient.delete<any>(url);
    }
    


}
