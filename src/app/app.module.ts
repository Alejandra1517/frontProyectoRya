import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';

import { ProductService } from './admin/service/product.service';
import { ClienteService } from './admin/service/cliente.service';

import { ServicioServiceService } from './admin/service/servicio.service';
import { EmpleadoService } from './admin/service/empleados.service';
import { authInterceptorProviders } from './auth/service/auth.interceptor';
import { MessageService } from 'primeng/api';
import { MaterialService } from './admin/service/material.service';
import { UsuarioService } from './admin/service/usuarios.service';
import { RolService } from './admin/service/rol.service';
import { LoginServiceService } from './auth/service/login.service.service';
import { RouterModule } from '@angular/router';
import { AdminGuard } from './auth/service/admin.guard';
import { Solicitudeservice } from './admin/service/solicitud.service';
import { cotizacionservice } from './admin/service/cotizacion.service';
import { Obraservice } from './admin/service/obra.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        AppLayoutModule,
        RouterModule.forRoot([], { useHash: false }) // Utiliza useHash: false para enrutamiento basado en HTML5
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy  },
        ProductService, ClienteService, ServicioServiceService, EmpleadoService, UsuarioService, RolService,LoginServiceService, Solicitudeservice, cotizacionservice, Obraservice,
        authInterceptorProviders, MaterialService, MessageService, AdminGuard, DatePipe


    ],
    bootstrap: [AppComponent]
})
export class AppModule { }


