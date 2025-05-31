import { Component, OnInit } from '@angular/core';
import { Guardia } from 'src/app/models/guardia.model';
import { GuardiaService } from 'src/app/services/guardia.service';

@Component({
  selector: 'app-guardias',
  templateUrl: './guardias.component.html',
  styleUrls: ['./guardias.component.scss']
})
export class GuardiasComponent implements OnInit {
  guardias: Guardia[] = [];
  nuevoGuardia: Guardia = { nombreCompleto: '', turno: '' };
  editando: boolean = false;
  seleccionado?: Guardia;

  constructor(private guardiaService: GuardiaService) {}

  ngOnInit(): void {
    this.cargarGuardias();
  }

  cargarGuardias(): void {
    this.guardiaService.obtenerGuardias().subscribe(data => this.guardias = data);
  }

  guardar(): void {
    if (this.editando && this.seleccionado?.idGuardia) {
      this.guardiaService.actualizarGuardia(this.seleccionado.idGuardia, this.nuevoGuardia).subscribe(() => {
        this.cargarGuardias();
        this.cancelar();
      });
    } else {
      this.guardiaService.crearGuardia(this.nuevoGuardia).subscribe(() => {
        this.cargarGuardias();
        this.cancelar();
      });
    }
  }

  editar(guardia: Guardia): void {
    this.nuevoGuardia = { ...guardia };
    this.seleccionado = guardia;
    this.editando = true;
  }

  eliminar(id: number): void {
    this.guardiaService.eliminarGuardia(id).subscribe(() => this.cargarGuardias());
  }

  cancelar(): void {
    this.nuevoGuardia = { nombreCompleto: '', turno: '' };
    this.editando = false;
    this.seleccionado = undefined;
  }
}