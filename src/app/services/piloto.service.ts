import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piloto } from '../models/piloto.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PilotoService {
  private apiUrl = `${environment.api}/pilotos`;

  constructor(private http: HttpClient) {}

  obtenerPilotos(): Observable<Piloto[]> {
    return this.http.get<Piloto[]>(this.apiUrl);
  }

  crearPiloto(piloto: Piloto): Observable<Piloto> {
    return this.http.post<Piloto>(this.apiUrl, piloto);
  }

  actualizarPiloto(id: number, piloto: Piloto): Observable<Piloto> {
    return this.http.put<Piloto>(`${this.apiUrl}/${id}`, piloto);
  }

  eliminarPiloto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}