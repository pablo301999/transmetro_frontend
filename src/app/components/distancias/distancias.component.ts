import { Component, OnInit } from '@angular/core';
import { Distancia } from 'src/app/models/distancia.model';
import { DistanciaService } from 'src/app/services/distancia.service';

@Component({
  selector: 'app-distancias',
  templateUrl: './distancias.component.html',
  styleUrls: ['./distancias.component.css']
})
export class DistanciasComponent implements OnInit {
  distancias: Distancia[] = [];
  nueva: Distancia = { estacionOrigen: 0, estacionDestino: 0, distanciaMetros: 0 };
  editando: boolean = false;
  seleccionado?: Distancia;

  constructor(private distanciaService: DistanciaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.distanciaService.obtenerDistancias().subscribe(data => this.distancias = data);
  }

  guardar(): void {
    if (this.editando && this.seleccionado?.idDistancia) {
      this.distanciaService.actualizarDistancia(this.seleccionado.idDistancia, this.nueva).subscribe(() => {
        this.cargar();
        this.cancelar();
      });
    } else {
      this.distanciaService.crearDistancia(this.nueva).subscribe(() => {
        this.cargar();
        this.cancelar();
      });
    }
  }

  editar(distancia: Distancia): void {
    this.nueva = { ...distancia };
    this.seleccionado = distancia;
    this.editando = true;
  }

  eliminar(id: number): void {
    this.distanciaService.eliminarDistancia(id).subscribe(() => this.cargar());
  }

  cancelar(): void {
    this.nueva = { estacionOrigen: 0, estacionDestino: 0, distanciaMetros: 0 };
    this.editando = false;
    this.seleccionado = undefined;
  }
}