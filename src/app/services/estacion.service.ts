import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estacion } from '../models/estacion.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EstacionService {
  private apiUrl = `${environment.api}/estaciones`;

  constructor(private http: HttpClient) {}

  obtener(): Observable<Estacion[]> {
    return this.http.get<Estacion[]>(this.apiUrl);
  }

  crear(estacion: Estacion): Observable<Estacion> {
    return this.http.post<Estacion>(this.apiUrl, estacion);
  }

  actualizar(id: number, estacion: Estacion): Observable<Estacion> {
    return this.http.put<Estacion>(`${this.apiUrl}/${id}`, estacion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}