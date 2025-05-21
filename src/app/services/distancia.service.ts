import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Distancia } from '../models/distancia.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DistanciaService {
  private apiUrl = `${environment.api}/distancias`;

  constructor(private http: HttpClient) {}

  obtenerDistancias(): Observable<Distancia[]> {
    return this.http.get<Distancia[]>(this.apiUrl);
  }

  crearDistancia(distancia: Distancia): Observable<Distancia> {
    return this.http.post<Distancia>(this.apiUrl, distancia);
  }

  actualizarDistancia(id: number, distancia: Distancia): Observable<Distancia> {
    return this.http.put<Distancia>(`${this.apiUrl}/${id}`, distancia);
  }

  eliminarDistancia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}