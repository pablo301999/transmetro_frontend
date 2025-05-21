import { Component, OnInit } from '@angular/core';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.scss']
})
export class BusesComponent implements OnInit {
  buses: Bus[] = [];
  nuevoBus: Bus = { numeroBus: '', capacidad: 0 };
  editando: boolean = false;
  seleccionado?: Bus;

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.cargarBuses();
  }

  cargarBuses(): void {
    this.busService.obtenerBuses().subscribe(data => this.buses = data);
  }

  guardar(): void {
    if (this.editando && this.seleccionado?.idBus) {
      this.busService.actualizarBus(this.seleccionado.idBus, this.nuevoBus).subscribe(() => {
        this.cargarBuses();
        this.cancelar();
      });
    } else {
      this.busService.crearBus(this.nuevoBus).subscribe(() => {
        this.cargarBuses();
        this.cancelar();
      });
    }
  }

  editar(bus: Bus): void {
    this.nuevoBus = { ...bus };
    this.seleccionado = bus;
    this.editando = true;
  }

  eliminar(id: number): void {
    this.busService.eliminarBus(id).subscribe(() => this.cargarBuses());
  }

  cancelar(): void {
    this.nuevoBus = { numeroBus: '', capacidad: 0 };
    this.editando = false;
    this.seleccionado = undefined;
  }
}
