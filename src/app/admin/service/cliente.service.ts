import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/clientes';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {

    URL_API: string = 'http://localhost:8081/api'
    constructor(private httpClient: HttpClient) {
  
    }
  


    getClientes(): Observable<Cliente[]> {
      return this.httpClient.get<any>(`${this.URL_API}/getClientes`).pipe(
        map(response => response.clientes)
      );
    }


  
    saveCliente(request: any): Observable<any> {
      return this.httpClient.post<any>(this.URL_API + '/postCliente', request).pipe(map(resp => resp));
    }
  
    updateCliente(id_cliente: number, request: any): Observable<any> {
      const url = `${this.URL_API}/putCliente/${id_cliente}`;
      return this.httpClient.put<any>(url, request).pipe(map(resp => resp));
    }
  
    deleteCliente(id_cliente: string): Observable<any> {
      const url = `${this.URL_API}/deleteCliente/${id_cliente}`;
      return this.httpClient.delete<any>(url).pipe(map(resp => resp));
    }


    deleteClientes(): Observable<any> {
      const url = `${this.URL_API}/deleteAllClientes`;
      return this.httpClient.delete<any>(url).pipe(map(resp => resp));
    }


    deleteAllClientes(): Observable<any> {
      const url = `${this.URL_API}/deleteAllClientes`;
      return this.httpClient.delete<any>(url);
    }
    


}
