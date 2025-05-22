import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioForm!: FormGroup;
  editando = false;
  idEditando: number | null = null;

  constructor(
    private usuariosService: UsuariosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombreCompleto: [''],
      correo: [''],
      usuario: [''],
      numeroEmpleado: [''],
      rol: [''],
      contraseña: [''],
      estado: [true]
    });
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.obtenerTodos().subscribe(data => this.usuarios = data);
  }

  guardar() {
    if (this.editando && this.idEditando !== null) {
      this.usuariosService.actualizar(this.idEditando, this.usuarioForm.value).subscribe(() => {
        this.cargarUsuarios();
        this.cancelar();
      });
    } else {
      this.usuariosService.crear(this.usuarioForm.value).subscribe(() => {
        this.cargarUsuarios();
        this.usuarioForm.reset();
      });
    }
  }

  editar(usuario: Usuario) {
    this.usuarioForm.patchValue(usuario);
    this.editando = true;
    this.idEditando = usuario.idUsuario;
  }

  eliminar(id: number) {
    this.usuariosService.eliminar(id).subscribe(() => this.cargarUsuarios());
  }

  cancelar() {
    this.usuarioForm.reset();
    this.editando = false;
    this.idEditando = null;
  }
}
