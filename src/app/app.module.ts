import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './routers/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './components/app-component/app.component';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ScrollSpyDirective } from './directives/scroll-spy/scroll-spy.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { JwtInterceptor } from './interceptors/JwtInterceptor.intercerptor';
import { SpinnerService } from './services/spinner.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { DatePipe } from '@angular/common';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { BusesComponent } from './components/buses/buses.component';
import { LineasComponent } from './components/lineas/lineas.component';
import { EstacionesComponent } from './components/estaciones/estaciones.component';
import { ParqueosComponent } from './components/parqueos/parqueos.component';
import { GuardiasComponent } from './components/guardias/guardias.component';
import { PilotosComponent } from './components/pilotos/pilotos.component';
import { DistanciasComponent } from './components/distancias/distancias.component';
import { AccesosComponent } from './components/accesos/accesos.component';


const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ScrollSpyDirective,
    LoginComponent,
    BarraNavegacionComponent,
    InicioComponent,
    SpinnerComponent,
    UsuariosComponent,
    BusesComponent,
    LineasComponent,
    EstacionesComponent,
    ParqueosComponent,
    GuardiasComponent,
    PilotosComponent,
    DistanciasComponent,
    AccesosComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule
  ],
  providers: [
    DatePipe,
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
