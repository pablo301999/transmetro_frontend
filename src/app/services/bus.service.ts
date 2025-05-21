import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../models/bus.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = `${environment.api}/buses`;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }

  crear(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(this.apiUrl, bus);
  }

  actualizar(id: number, bus: Bus): Observable<Bus> {
    return this.http.put<Bus>(`${this.apiUrl}/${id}`, bus);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  obtenerPorId(id: number): Observable<Bus> {
    return this.http.get<Bus>(`${this.apiUrl}/${id}`);
  }
}
