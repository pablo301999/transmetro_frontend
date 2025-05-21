import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guardia } from '../models/guardia.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class GuardiaService {
  private apiUrl = `${environment.api}/guardias`;

  constructor(private http: HttpClient) {}

  obtenerGuardias(): Observable<Guardia[]> {
    return this.http.get<Guardia[]>(this.apiUrl);
  }

  crearGuardia(guardia: Guardia): Observable<Guardia> {
    return this.http.post<Guardia>(this.apiUrl, guardia);
  }

  actualizarGuardia(id: number, guardia: Guardia): Observable<Guardia> {
    return this.http.put<Guardia>(`${this.apiUrl}/${id}`, guardia);
  }

  eliminarGuardia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}