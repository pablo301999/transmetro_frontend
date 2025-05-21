import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../models/bus.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BusService {
  private apiUrl = `${environment.api}/buses`;

  constructor(private http: HttpClient) {}

  obtenerBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }

  crearBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(this.apiUrl, bus);
  }

  actualizarBus(id: number, bus: Bus): Observable<Bus> {
    return this.http.put<Bus>(`${this.apiUrl}/${id}`, bus);
  }

  eliminarBus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}