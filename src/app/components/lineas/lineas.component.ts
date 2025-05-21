import { Component, OnInit } from '@angular/core';
import { Linea } from 'src/app/models/linea.model';
import { LineaService } from 'src/app/services/lineal.service';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.scss']
})
export class LineasComponent implements OnInit {
  lineas: Linea[] = [];
  nuevaLinea: Linea = { nombre: '', zonaOrigen: 0 };
  editando: boolean = false;
  seleccionado?: Linea;

  constructor(private lineaService: LineaService) {}

  ngOnInit(): void {
    this.cargarLineas();
  }

  cargarLineas(): void {
    this.lineaService.obtenerLineas().subscribe(data => this.lineas = data);
  }

  guardar(): void {
    if (this.editando && this.seleccionado?.idLinea) {
      this.lineaService.actualizarLinea(this.seleccionado.idLinea, this.nuevaLinea).subscribe(() => {
        this.cargarLineas();
        this.cancelar();
      });
    } else {
      this.lineaService.crearLinea(this.nuevaLinea).subscribe(() => {
        this.cargarLineas();
        this.cancelar();
      });
    }
  }

  editar(linea: Linea): void {
    this.nuevaLinea = { ...linea };
    this.seleccionado = linea;
    this.editando = true;
  }

  eliminar(id: number): void {
    this.lineaService.eliminarLinea(id).subscribe(() => this.cargarLineas());
  }

  cancelar(): void {
    this.nuevaLinea = { nombre: '', zonaOrigen: 0 };
    this.editando = false;
    this.seleccionado = undefined;
  }
}
