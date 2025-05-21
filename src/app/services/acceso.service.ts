import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acceso } from '../models/acceso.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AccesoService {
  private apiUrl = `${environment.api}/accesos`;

  constructor(private http: HttpClient) {}

  obtenerAccesos(): Observable<Acceso[]> {
    return this.http.get<Acceso[]>(this.apiUrl);
  }

  crearAcceso(acceso: Acceso): Observable<Acceso> {
    return this.http.post<Acceso>(this.apiUrl, acceso);
  }

  actualizarAcceso(id: number, acceso: Acceso): Observable<Acceso> {
    return this.http.put<Acceso>(`${this.apiUrl}/${id}`, acceso);
  }

  eliminarAcceso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}