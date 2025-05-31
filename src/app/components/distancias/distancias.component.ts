import { Component, OnInit } from '@angular/core';
import { Distancia } from 'src/app/models/distancia.model';
import { DistanciaService } from 'src/app/services/distancia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-distancias',
  templateUrl: './distancias.component.html',
  styleUrls: ['./distancias.component.scss']
})
export class DistanciasComponent implements OnInit {
  distancias: Distancia[] = [];
  nueva: Distancia = { idEstacionOrigen: 0, idEstacionDestino: 0, distanciaKm: 0 };
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
    this.distanciaService.actualizarDistancia(this.seleccionado.idDistancia, this.nueva).subscribe({
      next: () => {
        this.cargar();
        this.cancelar();
      },
      error: (error) => {
        const mensaje = error?.error?.message || 'Ocurrió un error inesperado';
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar',
          text: mensaje,
          confirmButtonText: 'Entendido'
        });
      }
    });
  } else {
    this.distanciaService.crearDistancia(this.nueva).subscribe({
      next: () => {
        this.cargar();
        this.cancelar();
      },
      error: (error) => {
        const mensaje = error?.error?.message || 'Ocurrió un error inesperado';
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar',
          text: mensaje,
          confirmButtonText: 'Entendido'
        });
      }
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
    this.nueva = { idEstacionOrigen: 0, idEstacionDestino: 0, distanciaKm: 0 };
    this.editando = false;
    this.seleccionado = undefined;
  }
}