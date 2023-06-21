import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Material } from '../models/materiales';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {



  
  URL_API: string = 'http://localhost:8081/api'
  constructor(private httpClient: HttpClient) {

  }

  // getMaterial(): Observable<Material[]> {
  //   return this.httpClient.get<Material[]>(this.URL_API + '/getMateriales').pipe(map(res => res));
  // }


  getMaterial(): Observable<Material[]> {
    return this.httpClient.get<any>(`${this.URL_API}/getMateriales`).pipe(
      map(response => response.allMateriales)
    );
  }


  saveMaterial(request: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API + '/postMaterial', request).pipe(map(resp => resp));
  }

  updateMaterial(id_material: number, request: any): Observable<any> {
    const url = `${this.URL_API}/putMaterial/${id_material}`;
    return this.httpClient.put<any>(url, request).pipe(map(resp => resp));
  }

  deleteMaterial(id_material: string): Observable<any> {
    const url = `${this.URL_API}/deleteMaterial/${id_material}`;
    return this.httpClient.delete<any>(url).pipe(map(resp => resp));
  }




}
