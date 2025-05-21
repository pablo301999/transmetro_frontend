import { Component, OnInit } from '@angular/core';
import { Piloto } from 'src/app/models/piloto.model';
import { PilotoService } from 'src/app/services/piloto.service';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.css']
})
export class PilotosComponent implements OnInit {
  pilotos: Piloto[] = [];
  nuevoPiloto: Piloto = { nombre: '' };
  editando: boolean = false;
  seleccionado?: Piloto;

  constructor(private pilotoService: PilotoService) {}

  ngOnInit(): void {
    this.cargarPilotos();
  }

  cargarPilotos(): void {
    this.pilotoService.obtenerPilotos().subscribe(data => this.pilotos = data);
  }

  guardar(): void {
    if (this.editando && this.seleccionado?.idPiloto) {
      this.pilotoService.actualizarPiloto(this.seleccionado.idPiloto, this.nuevoPiloto).subscribe(() => {
        this.cargarPilotos();
        this.cancelar();
      });
    } else {
      this.pilotoService.crearPiloto(this.nuevoPiloto).subscribe(() => {
        this.cargarPilotos();
        this.cancelar();
      });
    }
  }

  editar(piloto: Piloto): void {
    this.nuevoPiloto = { ...piloto };
    this.seleccionado = piloto;
    this.editando = true;
  }

  eliminar(id: number): void {
    this.pilotoService.eliminarPiloto(id).subscribe(() => this.cargarPilotos());
  }

  cancelar(): void {
    this.nuevoPiloto = { nombre: '' };
    this.editando = false;
    this.seleccionado = undefined;
  }
}
