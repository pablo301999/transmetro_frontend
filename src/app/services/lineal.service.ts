import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Linea } from '../models/linea.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LineaService {
  private apiUrl = `${environment.api}/lineas`;

  constructor(private http: HttpClient) {}

  obtenerLineas(): Observable<Linea[]> {
    return this.http.get<Linea[]>(this.apiUrl);
  }

  crearLinea(linea: Linea): Observable<Linea> {
    return this.http.post<Linea>(this.apiUrl, linea);
  }

  actualizarLinea(id: number, linea: Linea): Observable<Linea> {
    return this.http.put<Linea>(`${this.apiUrl}/${id}`, linea);
  }

  eliminarLinea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
