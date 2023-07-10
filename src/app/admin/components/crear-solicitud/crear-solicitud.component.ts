import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/admin/models/solicitud';
import { MessageService } from 'primeng/api';
import { Solicitudeservice } from 'src/app/admin/service/solicitud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { ServicioServiceService } from 'src/app/admin/service/servicio.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss'],
})
export class CrearSolicitudComponent implements OnInit {



  SolicitudDialog: boolean = false;

  EditarSolicitudDialog: boolean = false;

  deleteSolicitudDialog: boolean = false;

  deleteSolicitudesDialog: boolean = false;

  selectedSolicitudes: Solicitud[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  user: any;


  Solicituds: Solicitud[] = [];

  SolicitudSeleccionado!: Solicitud;

  selectedCategoriaServicio: any;

  
  // serviciosNames: { [key: string]: string } = {};
  
  selectedServicio: any;



  solicitudForm: FormGroup;
  servicios: any[] = []; // Array para almacenar los servicios seleccionados

  serviciosTable: any[] = [];

  filteredServicios: any[] = []; // Array para almacenar los servicios filtrados

  constructor(
    private formBuilder: FormBuilder,
    private solicitudService: Solicitudeservice,
    private servicioService: ServicioServiceService,
    private messageService: MessageService
  ) {
    this.solicitudForm = this.formBuilder.group({
      categoria_servicio: ['', Validators.required],
      servicio: [''],
      cantidad: [''],
      descripcion: ['']
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
    const serviciosIds = this.servicios.map(servicio => servicio.solicitud);

  const solicitud: Solicitud = {
    nombre_cliente: 'Nombre del cliente',
    categoria_servicio: this.solicitudForm.value.categoria_servicio,
    servicios: serviciosIds,
    cantidad: this.servicios.length,
    descripción: 'Descripción de cada servicio solicitado en la solicitud',
    estado_solicitud: 1,
    fecha_envio: new Date().toISOString(),
    solicitud: ''
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

    
  
  updateSolicitud(): void {
    this.submitted = true;

 
    const formData = this.solicitudForm.value;

    formData.id_Solicitud = this.SolicitudSeleccionado.solicitud; // Agrega el ID del Solicitud al formulario

    this.solicitudService.updateSolicitud(formData.id_Solicitud, formData).subscribe(
      (response) => {
        console.log('Solicitud actualizado exitosamente:', response);
        this.getSolicitudes();
        this.messageService.add({
          severity: 'success',
          summary: 'Actualización exitosa',
          detail: 'Solicitud actualizado correctamente',
          life: 3000,
        });
        this.EditarSolicitudDialog = false;
      },
      (error) => {
        console.log('Error al actualizar el Solicitud:', error);
      }
    );
  }



  getSolicitudes(): void {
    this.solicitudService.getSolicitudes().subscribe(
      (Solicitudes: Solicitud[]) => {
        this.Solicituds = Solicitudes;
      },
      (error) => {
        console.log('Error al obtener los empleados:', error);
      }
    );
  }


  openNew() {
    this.submitted = false;
    this.SolicitudDialog = true;
    this.solicitudForm.reset();
  }

  deleteselectedSolicitudes() {
    this.deleteSolicitudesDialog = true;
  }

  editSolicitud(Solicitud: Solicitud) {
    if (Solicitud) {
      this.SolicitudSeleccionado = Solicitud;
      this.solicitudForm.patchValue({
        // servicio: this.user.servicio,
        cantidad: Solicitud.cantidad,
        descripción: Solicitud.descripción
      });

      this.submitted = false;
      this.EditarSolicitudDialog = true; // Utiliza la propiedad correcta

    }
  }


  deleteSolicitud(Solicitud: Solicitud) {
    this.SolicitudSeleccionado = Solicitud;
    this.deleteSolicitudDialog = true;
  }

  confirmDelete() {
    if (
      this.SolicitudSeleccionado &&
      typeof this.SolicitudSeleccionado.solicitud === 'string'
    ) {
      this.deleteSolicitudDialog = false;

      this.solicitudService.deleteSolicitud(this.SolicitudSeleccionado.solicitud).subscribe(
        (response) => {
          console.log('Solicitud eliminado exitosamente:', response);
          this.getSolicitudes();
        },
        (error) => {
          console.log('Error al eliminar el Solicitud:', error);
        }
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Acción exitosa',
        detail: 'Solicitud eliminado',
        life: 3000,
      });
    }
  }

  confirmDeleteSelected() {
    this.deleteSolicitudDialog = false;

    this.Solicituds = this.Solicituds.filter(val => !this.selectedSolicitudes.includes(val)); //Elimina los productos seleccionados del array products 
    
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitudes eliminados', life: 3000 });
    
    this.selectedSolicitudes = []; //indica que ya no hay productos seleccionados para eliminar

}

  seleccionarSolicitud(Solicitud: Solicitud) {
    this.SolicitudSeleccionado = Solicitud;
  }

  hideDialog() {
    this.SolicitudDialog = false;
    this.EditarSolicitudDialog = false; // Asegúrate de ocultar la ventana modal de edición también
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}




