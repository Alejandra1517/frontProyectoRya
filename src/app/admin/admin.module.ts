import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';


//primeNg
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';


import { CrudComponent } from './components/crud/crud.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { MaterialesComponent } from './components/materiales/materiales.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { ObrasComponent } from './components/obras/obras.component';
import { RolesComponent } from './components/roles/roles.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { ModificarSolicitudComponent } from './components/modificar-solicitud/modificar-solicitud.component';
import { AgregarmaterialSolicitudComponent } from './components/agregarmaterial-solicitud/agregarmaterial-solicitud.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    ClientesComponent,
    CrudComponent,
    UsuariosComponent,
    ServiciosComponent,
    MaterialesComponent,
    EmpleadosComponent,
    CotizacionesComponent,
    ObrasComponent,
    RolesComponent,
    SolicitudesComponent,
    ModificarSolicitudComponent,
    AgregarmaterialSolicitudComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    TableModule,
    ReactiveFormsModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    InputSwitchModule,
    DialogModule,
    RouterModule.forChild([
      { path: 'roles', component: RolesComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'servicios', component: ServiciosComponent },
      { path: 'materiales', component: MaterialesComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'solicitudes', component: SolicitudesComponent },
      { path: 'modificar-solicitud', component: ModificarSolicitudComponent },
      { path: 'agregarmaterial-solicitud', component: AgregarmaterialSolicitudComponent },
      { path: 'cotizaciones', component: CotizacionesComponent },
      { path: 'obras', component: ObrasComponent },
      { path: 'crud', component: CrudComponent }
    ])
  ]
})
export class AdminModule { }

