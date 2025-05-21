import { Component, OnInit } from '@angular/core';
import { Parqueo } from 'src/app/models/parqueo.model';
import { ParqueoService } from 'src/app/services/parqueo.service';

@Component({
  selector: 'app-parqueos',
  templateUrl: './parqueos.component.html',
  styleUrls: ['./parqueos.component.scss']
})
export class ParqueosComponent implements OnInit {
  parqueos: Parqueo[] = [];
  nuevoParqueo: Parqueo = { nombre: '', direccion: '', capacidad: 0 };
  editando: boolean = false;
  seleccionado?: Parqueo;

  constructor(private parqueoService: ParqueoService) {}

  ngOnInit(): void {
    this.cargarParqueos();
  }

  cargarParqueos(): void {
    this.parqueoService.obtenerParqueos().subscribe(data => this.parqueos = data);
  }

  guardar(): void {
    if (this.editando && this.seleccionado?.idParqueo) {
      this.parqueoService.actualizarParqueo(this.seleccionado.idParqueo, this.nuevoParqueo).subscribe(() => {
        this.cargarParqueos();
        this.cancelar();
      });
    } else {
      this.parqueoService.crearParqueo(this.nuevoParqueo).subscribe(() => {
        this.cargarParqueos();
        this.cancelar();
      });
    }
  }

  editar(parqueo: Parqueo): void {
    this.nuevoParqueo = { ...parqueo };
    this.seleccionado = parqueo;
    this.editando = true;
  }

  eliminar(id: number): void {
    this.parqueoService.eliminarParqueo(id).subscribe(() => this.cargarParqueos());
  }

  cancelar(): void {
    this.nuevoParqueo = { nombre: '', direccion: '', capacidad: 0 };
    this.editando = false;
    this.seleccionado = undefined;
  }
}