import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleados';
import { map } from 'rxjs/operators';

@Injectable()
export class EmpleadoService {

    URL_API: string = 'http://localhost:8081/api'
    constructor(private httpClient: HttpClient) {
  
    }
  
    // getEmpleados(): Observable<Empleado[]> {
    //   return this.httpClient.get<Empleado[]>(this.URL_API + '/getEmpleados').pipe(map(res => res));
    // }


    getEmpleados(): Observable<Empleado[]> {
      return this.httpClient.get<any>(`${this.URL_API}/getEmpleados`).pipe(
        map(response => response.allEmpleados)
      );
    }



  
    saveEmpleado(request: any): Observable<any> {
      return this.httpClient.post<any>(this.URL_API + '/postEmpleado', request).pipe(map(resp => resp));
    }
  
    updateEmpleado(id_empleado: number, request: any): Observable<any> {
      const url = `${this.URL_API}/putEmpleado/${id_empleado}`;
      return this.httpClient.put<any>(url, request).pipe(map(resp => resp));
    }
  
    deleteEmpleado(id_empleado: string): Observable<any> {
      const url = `${this.URL_API}/deleteEmpleado/${id_empleado}`;
      return this.httpClient.delete<any>(url).pipe(map(resp => resp));
    }



    // deleteEmpleados(): Observable<any> {
    //   const url = `${this.URL_API}/deleteAll`;
    //   return this.httpClient.delete<any>(url).pipe(map(resp => resp));
    // }
    


}
