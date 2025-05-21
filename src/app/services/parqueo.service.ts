import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parqueo } from '../models/parqueo.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ParqueoService {
  private apiUrl = `${environment.api}/parqueos`;

  constructor(private http: HttpClient) {}

  obtenerParqueos(): Observable<Parqueo[]> {
    return this.http.get<Parqueo[]>(this.apiUrl);
  }

  crearParqueo(parqueo: Parqueo): Observable<Parqueo> {
    return this.http.post<Parqueo>(this.apiUrl, parqueo);
  }

  actualizarParqueo(id: number, parqueo: Parqueo): Observable<Parqueo> {
    return this.http.put<Parqueo>(`${this.apiUrl}/${id}`, parqueo);
  }

  eliminarParqueo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
