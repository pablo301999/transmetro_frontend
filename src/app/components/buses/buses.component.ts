import { Component, OnInit } from '@angular/core';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html'
})
export class BusesComponent implements OnInit {
  buses: Bus[] = [];
  bus: Bus = { numeroBus: '', capacidad: 0 };
  columnas: string[] = ['idBus', 'numeroBus', 'capacidad', 'acciones'];

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.obtenerBuses();
  }

  obtenerBuses(): void {
    this.busService.obtenerTodos().subscribe(data => this.buses = data);
  }

  guardar(): void {
    if (this.bus.idBus) {
      this.busService.actualizar(this.bus.idBus, this.bus).subscribe(() => {
        this.obtenerBuses();
        this.bus = { numeroBus: '', capacidad: 0 };
      });
    } else {
      this.busService.crear(this.bus).subscribe(() => {
        this.obtenerBuses();
        this.bus = { numeroBus: '', capacidad: 0 };
      });
    }
  }

  editar(b: Bus): void {
    this.bus = { ...b };
  }

  eliminar(id: number): void {
    this.busService.eliminar(id).subscribe(() => this.obtenerBuses());
  }
}
