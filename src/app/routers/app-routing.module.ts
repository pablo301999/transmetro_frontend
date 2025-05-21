import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "../components/login/login.component";
import { AuthGuard } from "../auth/auth.guard";
import { InicioComponent } from "../components/inicio/inicio.component";
import { UsuariosComponent } from '../components/usuarios/usuarios.component';
import { BusesComponent } from "../components/buses/buses.component";
import { LineasComponent } from "../components/lineas/lineas.component";
import { EstacionesComponent } from "../components/estaciones/estaciones.component";
import { ParqueosComponent } from "../components/parqueos/parqueos.component";
import { PilotosComponent } from "../components/pilotos/pilotos.component";
import { DistanciasComponent } from "../components/distancias/distancias.component";
import { AccesosComponent } from "../components/accesos/accesos.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
 // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'buses', component: BusesComponent },
  { path: 'lineas', component: LineasComponent },
  { path: 'estaciones', component: EstacionesComponent },
  { path: 'parqueos', component: ParqueosComponent },
  { path: 'pilotos', component: PilotosComponent },
  { path: 'distancias', component: DistanciasComponent },
  { path: 'accesos', component: AccesosComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
