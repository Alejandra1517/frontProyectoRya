import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';


//primeNg
import { ListboxModule } from 'primeng/listbox';
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
import { AutoCompleteModule } from 'primeng/autocomplete';


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
import { CalendarModule } from 'primeng/calendar';
import { CrearCotizacionComponent } from './components/crear-cotizacion/crear-cotizacion.component';
import { ModificarCotizacionComponent } from './components/modificar-cotizacion/modificar-cotizacion.component';
import { ServiciosObraComponent } from './components/servicios-obra/servicios-obra.component';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';

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
    CrearCotizacionComponent,
    ModificarCotizacionComponent,
    ServiciosObraComponent,
    CrearSolicitudComponent
  ],
  imports: [
    CommonModule,
    AutoCompleteModule,
    ListboxModule,
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
      { path: 'crear-solicitud', component: CrearSolicitudComponent },
      { path: 'modificar-solicitud', component: ModificarSolicitudComponent },
      { path: 'cotizaciones', component: CotizacionesComponent },
      { path: 'crear-cotizacion', component: CrearCotizacionComponent },
      { path: 'modificar-cotizacion', component: ModificarCotizacionComponent },
      { path: 'obras', component: ObrasComponent },
      { path: 'servicios-obra', component: ServiciosObraComponent },
      { path: 'crud', component: CrudComponent }
    ])
  ]
})
export class AdminModule { }

