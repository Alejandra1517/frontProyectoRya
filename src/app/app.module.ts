import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';

import { ProductService } from './admin/service/product.service';
import { ClienteService } from './admin/service/cliente.service';

import { ServicioServiceService } from './admin/service/servicio.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ProductService, ClienteService, ServicioServiceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }


