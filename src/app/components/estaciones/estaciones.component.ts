import { Component, OnInit } from '@angular/core';
import { EstacionService } from 'src/app/services/estacion.service';
import { Estacion } from 'src/app/models/estacion.model';

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrls: ['./estaciones.component.scss']
})
export class EstacionesComponent implements OnInit {
  estaciones: Estacion[] = [];
  nueva: Estacion = { nombre: '' };
  editando: boolean = false;
  seleccionado?: Estacion;

  constructor(private estacionService: EstacionService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.estacionService.obtener().subscribe(data => this.estaciones = data);
  }

  guardar(): void {
    const op = this.editando && this.seleccionado?.idEstacion
      ? this.estacionService.actualizar(this.seleccionado.idEstacion, this.nueva)
      : this.estacionService.crear(this.nueva);

    op.subscribe(() => {
      this.cargar();
      this.cancelar();
    });
  }

  editar(estacion: Estacion): void {
    this.nueva = { ...estacion };
    this.seleccionado = estacion;
    this.editando = true;
  }

  eliminar(id: number): void {
    this.estacionService.eliminar(id).subscribe(() => this.cargar());
  }

  cancelar(): void {
    this.nueva = { nombre: '' };
    this.editando = false;
    this.seleccionado = undefined;
  }
}
