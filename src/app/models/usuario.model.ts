export interface Usuario {
  idUsuario: number;
  nombreCompleto: string;
  correo: string;
  numeroEmpleado?: string;
  rol: string;
  contraseña: string;
  estado: boolean;
}
