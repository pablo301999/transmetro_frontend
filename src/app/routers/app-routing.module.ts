import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "../components/login/login.component";
import { AuthGuard } from "../auth/auth.guard";
import { InicioComponent } from "../components/inicio/inicio.component";
import { UsuariosComponent } from '../components/usuarios/usuarios.component';
import { BusesComponent } from "../components/buses/buses.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
 // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'buses', component: BusesComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
