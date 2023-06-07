import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/clientes';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {

    URL_API: string = 'http://localhost:8080/clients'
    constructor(private httpClient: HttpClient) {
  
    }
  
    getClientes(): Observable<Cliente[]> {
      return this.httpClient.get<Cliente[]>(this.URL_API + '/getClients').pipe(map(res => res));
    }

    // getProducts() {
    //     return this.httpClient.get<any>(this.URL_API + '/getClients')
    //         .toPromise()
    //         .then(res => res.data as Cliente[])
    //         .then(data => data);
    // }
  
    saveCliente(request: any): Observable<any> {
      return this.httpClient.post<any>(this.URL_API + '/postClient', request).pipe(map(resp => resp));
    }
  
    updateCliente(id_cliente: number, request: any): Observable<any> {
      const url = `${this.URL_API}/putClient/${id_cliente}`;
      return this.httpClient.put<any>(url, request).pipe(map(resp => resp));
    }
  
    deleteCliente(id_cliente: number): Observable<any> {
      const url = `${this.URL_API}/deleteClient/${id_cliente}`;
      return this.httpClient.delete<any>(url).pipe(map(resp => resp));
    }


    deleteClientes(): Observable<any> {
      const url = `${this.URL_API}/deleteAllClients`;
      return this.httpClient.delete<any>(url).pipe(map(resp => resp));
    }
    


}
