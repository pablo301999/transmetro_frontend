import { Component, OnInit } from '@angular/core';
import { Acceso } from 'src/app/models/acceso.model';
import { AccesoService } from 'src/app/services/acceso.service';

@Component({
  selector: 'app-accesos',
    styleUrls: ['./accesos.component.scss'],
  templateUrl: './accesos.component.html'
})
export class AccesosComponent implements OnInit {
  accesos: Acceso[] = [];
  nuevoAcceso: Acceso = {};
  modoEditar = false;
  accesoEditando: Acceso = {};

  constructor(private accesoService: AccesoService) {}

  ngOnInit(): void {
    this.cargarAccesos();
  }

  cargarAccesos() {
    this.accesoService.obtenerAccesos().subscribe(data => this.accesos = data);
  }

  guardarAcceso() {
    if (this.modoEditar && this.accesoEditando.idAcceso) {
      this.accesoService.actualizarAcceso(this.accesoEditando.idAcceso, this.accesoEditando).subscribe(() => {
        this.cargarAccesos();
        this.cancelarEdicion();
      });
    } else {
      this.accesoService.crearAcceso(this.nuevoAcceso).subscribe(() => {
        this.cargarAccesos();
        this.nuevoAcceso = {};
      });
    }
  }

  editarAcceso(acceso: Acceso) {
    this.modoEditar = true;
    this.accesoEditando = { ...acceso };
  }

  cancelarEdicion() {
    this.modoEditar = false;
    this.accesoEditando = {};
  }

  eliminarAcceso(id: number) {
    this.accesoService.eliminarAcceso(id).subscribe(() => this.cargarAccesos());
  }
}