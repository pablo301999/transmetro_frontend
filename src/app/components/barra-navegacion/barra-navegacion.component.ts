import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.scss']
})
export class BarraNavegacionComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  shouldShowLogout(): boolean {
    const excludedRoutes = ['/login'];
    return !excludedRoutes.includes(this.router.url);
  }

  shouldShowOptions(): boolean {
    const excludedRoutes = ['/login'];
    return !excludedRoutes.includes(this.router.url);
  }

  logout(): void {
    this.authService.logout();
  }

  // navigateHome(): void {
  //   if (this.authService.isAuthenticated()) {
  //     this.router.navigate(['/inicio']);
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }

  // hasRole(role: string): boolean {
  //   const roles = this.authService.getRoles();
  //   return roles.includes(role);
  // }
}
