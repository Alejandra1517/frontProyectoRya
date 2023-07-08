import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/admin/models/solicitud';
import { MessageService } from 'primeng/api';
import { Solicitudeservice } from 'src/app/admin/service/solicitud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioServiceService } from 'src/app/admin/service/servicio.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss'],
})
export class CrearSolicitudComponent implements OnInit {
  solicitudForm: FormGroup;
  servicios: any[] = []; // Array para almacenar los servicios seleccionados

  serviciosTable: any[] = [];

  filteredServicios: any[] = []; // Array para almacenar los servicios filtrados

  constructor(
    private formBuilder: FormBuilder,
    private solicitudService: Solicitudeservice,
    private servicioService: ServicioServiceService
  ) {
    this.solicitudForm = this.formBuilder.group({
      categoria_servicio: ['', Validators.required],
      servicio: ['', Validators.required],
      cantidad: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Obtiene los servicios disponibles al inicializar el componente
    this.getServicios();
  }

  getServicios() {
    this.servicioService.getServicio().subscribe(
      response => {
        // Asigna los servicios disponibles al array 'servicios'
        this.servicios = response;
      },
      error => {
        console.error('Error al obtener los servicios:', error);
      }
    );
  }

  filterServicios(event: any) {
    const filteredValues = this.servicios.filter(servicio =>
      servicio.nombre_servicio.toLowerCase().includes(event.query.toLowerCase())
    );
    this.filteredServicios = filteredValues;
  }

  agregarServicio() {
    const servicio = {
      categoria: this.solicitudForm.value.categoria_servicio,
      nombre_servicio: this.solicitudForm.value.servicio.nombre_servicio,
      cantidad: this.solicitudForm.value.cantidad,
      descripcion: this.solicitudForm.value.descripcion
    };
  
    this.serviciosTable.push(servicio);

    console.log(this.serviciosTable)
    console.log(this.solicitudForm.value.servicio)
    //Limpia el formulario
    this.solicitudForm.patchValue({
      servicio: '',
      cantidad: '',
      descripcion: ''
    });
  }
  

  enviarSolicitud() {
    const serviciosIds = this.servicios.map(servicio => servicio._id);

  const solicitud: Solicitud = {
    nombre_cliente: 'Nombre del cliente',
    categoria_servicio: this.solicitudForm.value.categoria_servicio,
    servicios: serviciosIds,
    cantidad: this.servicios.length,
    descripción: 'Descripción de cada servicio solicitado en la solicitud',
    estado_solicitud: 1,
    fecha_envio: new Date().toISOString(),
    _id: ''
  };

    this.solicitudService.saveSolicitud(solicitud).subscribe(
      response => {
        console.log('Solicitud enviada:', response);
        this.solicitudForm.reset();
        this.servicios = [];
      },
      error => {
        console.error('Error al enviar la solicitud:', error);
      }
    );
  }
}


// import { Component, OnInit } from '@angular/core';
// import { Solicitud } from 'src/app/admin/models/solicitud';
// import { MessageService } from 'primeng/api';
// import { Solicitudeservice } from 'src/app/admin/service/solicitud.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ServicioServiceService } from 'src/app/admin/service/servicio.service';
// import { Servicio } from '../../models/servicios';
// import { DatePipe } from '@angular/common';

// @Component({
//   selector: 'app-crear-solicitud',
//   templateUrl: './crear-solicitud.component.html',
//   styleUrls: ['./crear-solicitud.component.scss'],
// })

// export class CrearSolicitudComponent implements OnInit {
//   solicitudForm: FormGroup = new FormGroup({});
//   servicios: any[] = [];
//   solicitudServicios: any[] = [];


//   constructor(
//     private formBuilder: FormBuilder,
//     private solicitudService: Solicitudeservice,
//     private servicioService: ServicioServiceService,
//     private datePipe: DatePipe
//   ) {}


//   cols: any[] = [
//     { field: 'servicio', header: 'Servicio', width: '10%', minWidth: '10rem' },
//     { field: 'cantidad', header: 'Cantidad', width: '10%', minWidth: '10rem' },
//     { field: 'descripcion', header: 'Descripción', width: '10%', minWidth: '10rem' },
//   ];
  

//   ngOnInit(): void {
//     this.initForm();
//     this.loadServicios();
//   }

//   initForm(): void {
//     this.solicitudForm = this.formBuilder.group({
//       nombre_cliente: ['', Validators.required],
//       categoria_servicio: ['', Validators.required],
//       servicio: ['', Validators.required],
//       cantidad: ['', Validators.required],
//       descripcion: ['', Validators.required],
//       estado_solicitud: ['', Validators.required],
//       fecha_envio: ['', Validators.required],
//       servicios: [''],
//     });
//   }

//   loadServicios(): void {
//     this.servicioService.getServicio().subscribe(
//       (servicios: any[]) => {
//         this.servicios = servicios;
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
  

  
//   // agregarServicio(): void {
//   //   const servicioId = this.solicitudForm.get('servicios')?.value;
  
//   //   console.log("id", servicioId);
      
//   //   const servicio = this.servicios.find((s) => s.servicios === servicioId.servicios);
  
//   //   console.log("servicio", this.servicios);
      
//   //   if (servicio) {


//   //     this.solicitudServicios.push(servicio);
  
//   //     console.log("solicitudServicio", this.solicitudServicios); // Verificar el contenido del arreglo
//   //   }
//   // }
  

//   agregarServicio(): void {
//     const servicioId = this.solicitudForm.get('servicios')?.value;
//     const servicio = this.servicios.find((s) => s.servicios === servicioId.servicios);
  
//     if (servicio) {
//       const servicioSeleccionado = {
//         categoria: servicio.categoria,
//         nombre_servicio: servicio.nombre_servicio,
//         descripcion: this.solicitudForm.get('descripcion')?.value,
//         cantidad: this.solicitudForm.get('cantidad')?.value,
//       };
  
//       // Guardar los datos de la solicitud
//       this.solicitudServicios.push(servicioSeleccionado);
//       this.solicitudForm.patchValue({
//         cantidad: this.solicitudForm.get('descripcion')?.value, // Asignar el valor correspondiente del formulario
//         descripción: this.solicitudForm.get('descripcion')?.value, // Asignar el valor correspondiente del formulario
//         // Asignar los demás valores correspondientes del formulario
//       });
  
//       console.log("solicitudServicio", this.solicitudServicios);
//     }
//   }
  


//   enviarSolicitud(): void {
//     const solicitud: Solicitud = {
//       nombre_cliente: this.solicitudForm.get('nombre_cliente')?.value,
//       categoria_servicio: this.solicitudForm.get('categoria_servicio')?.value,
//       servicios: this.solicitudServicios,
//       cantidad: this.solicitudForm.get('cantidad')?.value,
//       descripción: this.solicitudForm.get('descripcion')?.value,
//       estado_solicitud: this.solicitudForm.get('estado_solicitud')?.value,
//       fecha_envio: this.solicitudForm.get('fecha_envio')?.value,
//       _id: '',
//       servicio: '',
//     };

//     this.solicitudService.saveSolicitud(solicitud).subscribe(
//       (response) => {
//         console.log('Solicitud enviada correctamente.');
//         // Realizar cualquier acción adicional después de enviar la solicitud
//       },
//       (error) => {
//         console.error('Error al enviar la solicitud:', error);
//       }
//     );
//   }

// }












// import { Component, OnInit } from '@angular/core';
// import { Solicitud } from 'src/app/admin/models/solicitud';
// import { MessageService } from 'primeng/api';
// import { Table } from 'primeng/table';
// import { Solicitudeservice } from 'src/app/admin/service/solicitud.service'
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoginServiceService } from 'src/app/auth/service/login.service.service';
// import { ServicioServiceService } from 'src/app/admin/service/servicio.service';
// import { Servicio } from '../../models/servicios';


// @Component({
//   selector: 'app-crear-solicitud',
//   templateUrl: './crear-solicitud.component.html',
//   styleUrls: ['./crear-solicitud.component.scss']
// })
// export class CrearSolicitudComponent  implements OnInit {

//   SolicitudDialog: boolean = false;

//   EditarSolicitudDialog: boolean = false;

//   deleteSolicitudDialog: boolean = false;

//   deleteSolicitudesDialog: boolean = false;

//   selectedSolicitudes: Solicitud[] = [];

//   submitted: boolean = false;

//   cols: any[] = [];

//   statuses: any[] = [];

//   user: any;

//   rowsPerPageOptions = [5, 10, 20];
//   Solicitud: Solicitud = {
//     _id: '',
//     nombre_cliente: '',
//     categoria_servicio: 0,
//     servicio: '',
//     cantidad: 0,
//     descripción: '',
//     estado_solicitud: 0,
//     fecha_envio: 0,
//     servicios: []
//   };
  



//   SolicitudesForm!: FormGroup;

//   modificarSolicitudForm!: FormGroup;

//   Solicituds: Solicitud[] = [];

//   SolicitudSeleccionado!: Solicitud;

//   constructor(
//     private solicitudService: Solicitudeservice,
//     private messageService: MessageService,
//     private formBuilder: FormBuilder,
//     public loginService: LoginServiceService,
//     public ServicioServiceService: ServicioServiceService,
//     private router: Router
//   ) {}


  
//   // serviciosNames: { [key: string]: string } = {};


//   servicios: any[] = [];
  
//   selectedServicio: any;


//   onRolChange(event: any) {
//     this.selectedServicio = event.value;
//     this.SolicitudesForm.patchValue({ servicios: this.selectedServicio.nombre_servicio });
//     console.log("holi", this.selectedServicio.nombre_servicio);
//   }


  
//   selectedCategoriaServicio: any;


//   onRolChangeC(event: any) {
//     this.selectedCategoriaServicio = event.value;
//     this.SolicitudesForm.patchValue({ categoria_servicio: this.selectedCategoriaServicio.categoria });
//     console.log("holi2", this.selectedCategoriaServicio.categoria);
//   }

  
//   ngOnInit(): void {

    
//     this.ServicioServiceService.getServicio().subscribe(
//       (data) => {
//         this.servicios = data;


//         console.log(this.servicios)
//       },
//       (error) => {
//         console.error(error);
//       }
//     );


//     this.user = this.loginService.getUser();


//     this.getSolicitudes();
//     this.initForm();
  

//     this.cols = [
//       { field: 'servicio', header: 'servicio' },
//       { field: 'cantidad', header: 'cantidad' },
//       { field: 'descripción', header: 'descripción' },
//   ];

//     this.statuses = [
//       { label: 'Pendiente', value: '0' },
//       { label: 'Aprobada', value: '1' },
//       { label: 'Rechazada', value: '2' },
//       { label: 'Enviada', value: '3' },
//     ];

 

//   }

//   initForm(): void {
//     this.SolicitudesForm = this.formBuilder.group({
//       servicios:  ['', ],
//       nombre_cliente:  ['', Validators.required],
//       categoria_servicio:  [''],
//       servicio:  ['', Validators.required],
//       cantidad:  ['', Validators.required],
//       descripción: ['', Validators.required],
//       estado_solicitud:  ['1', Validators.required],
//       fecha_envio:  [''],
      
//     });
//   }

//   saveSolicitud(): void {
//     this.submitted = true;
  

//     if (this.SolicitudesForm.invalid) {
//       console.log("invalid")
//       return;
//     }
    
//     const formData = this.SolicitudesForm.value;
    
//     console.log("Alo", formData)
//     // Asignar los servicios seleccionados al campo 'servicios'
//     formData.servicios = this.selectedSolicitudes;
  
//     this.solicitudService.saveSolicitud(formData).subscribe(
//       (response) => {
//         console.log('Solicitud registrado exitosamente:', response);
//         this.getSolicitudes();
//         this.messageService.add({
//           severity: 'success',
//           summary: 'Guardado exitoso',
//           detail: 'Registrado correctamente',
//           life: 3000,
//         });
//         this.SolicitudDialog = false;
//       },
//       (error) => {
//         console.log('Error al registrar el Solicitud:', error);
//       }
//     );
//   }


//   agregarServicio() {
//     const servicioControl = this.SolicitudesForm.get('servicio');
    
//     if (servicioControl) {
//       const servicioSeleccionado = servicioControl.value;
//       this.selectedSolicitudes.push(servicioSeleccionado);
//       servicioControl.reset(); // Restablecer el campo de selección de servicio
//     }
//   }
  
  
  
//   updateSolicitud(): void {
//     this.submitted = true;

 
//     const formData = this.SolicitudesForm.value;

//     formData.id_Solicitud = this.SolicitudSeleccionado._id; // Agrega el ID del Solicitud al formulario

//     this.solicitudService.updateSolicitud(formData.id_Solicitud, formData).subscribe(
//       (response) => {
//         console.log('Solicitud actualizado exitosamente:', response);
//         this.getSolicitudes();
//         this.messageService.add({
//           severity: 'success',
//           summary: 'Actualización exitosa',
//           detail: 'Solicitud actualizado correctamente',
//           life: 3000,
//         });
//         this.EditarSolicitudDialog = false;
//       },
//       (error) => {
//         console.log('Error al actualizar el Solicitud:', error);
//       }
//     );
//   }



//   getSolicitudes(): void {
//     this.solicitudService.getSolicitudes().subscribe(
//       (Solicitudes: Solicitud[]) => {
//         this.Solicituds = Solicitudes;
//       },
//       (error) => {
//         console.log('Error al obtener los empleados:', error);
//       }
//     );
//   }


//   openNew() {
//     this.submitted = false;
//     this.SolicitudDialog = true;
//     this.SolicitudesForm.reset();
//   }

//   deleteselectedSolicitudes() {
//     this.deleteSolicitudesDialog = true;
//   }

//   editServicioMaterial(Solicitud: Solicitud) {
//     if (Solicitud) {
//       this.SolicitudSeleccionado = Solicitud;
//       this.SolicitudesForm.patchValue({
//         servicios: this.user.servicios,
//         nombre_cliente: this.user.nombre_completo,
//         categoria_servicio: Solicitud.categoria_servicio,
//         servicio: Solicitud.servicio,
//         cantidad: Solicitud.cantidad,
//         descripción: Solicitud.descripción,
//         estado_solicitud: Solicitud.estado_solicitud,
//         fecha_envio: Solicitud.fecha_envio
//       });

//       this.submitted = false;
//       this.EditarSolicitudDialog = true; // Utiliza la propiedad correcta

//     }
//   }


//   deleteSolicitud(Solicitud: Solicitud) {
//     this.SolicitudSeleccionado = Solicitud;
//     this.deleteSolicitudDialog = true;
//   }

//   confirmDelete() {
//     if (
//       this.SolicitudSeleccionado &&
//       typeof this.SolicitudSeleccionado._id === 'string'
//     ) {
//       this.deleteSolicitudDialog = false;

//       this.solicitudService.deleteSolicitud(this.SolicitudSeleccionado._id).subscribe(
//         (response) => {
//           console.log('Solicitud eliminado exitosamente:', response);
//           this.getSolicitudes();
//         },
//         (error) => {
//           console.log('Error al eliminar el Solicitud:', error);
//         }
//       );

//       this.messageService.add({
//         severity: 'success',
//         summary: 'Acción exitosa',
//         detail: 'Solicitud eliminado',
//         life: 3000,
//       });
//     }
//   }

//   confirmDeleteSelected() {
//     this.deleteSolicitudDialog = false;

//     this.Solicituds = this.Solicituds.filter(val => !this.selectedSolicitudes.includes(val)); //Elimina los productos seleccionados del array products 
    
//     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitudes eliminados', life: 3000 });
    
//     this.selectedSolicitudes = []; //indica que ya no hay productos seleccionados para eliminar

// }

//   seleccionarSolicitud(Solicitud: Solicitud) {
//     this.SolicitudSeleccionado = Solicitud;
//   }

//   hideDialog() {
//     this.SolicitudDialog = false;
//     this.EditarSolicitudDialog = false; // Asegúrate de ocultar la ventana modal de edición también
//     this.submitted = false;
//   }


//   onGlobalFilter(table: Table, event: Event) {
//     table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
//   }
// }
