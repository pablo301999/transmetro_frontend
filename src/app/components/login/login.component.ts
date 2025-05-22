import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from 'src/app/models/login-request.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  datos: LoginRequest = { usuario: '', contrasenia: '' };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

iniciarSesion() {
  this.authService.login(this.datos).subscribe({
    next: res => {
      this.authService.guardarToken(res.token);
      this.router.navigate(['/usuarios']);
    },
    error: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Credenciales incorrectas.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Intentar de nuevo'
      });
    }
  });
}

}
