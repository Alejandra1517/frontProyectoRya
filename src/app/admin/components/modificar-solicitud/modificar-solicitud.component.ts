import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/admin/models/solicitud';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Solicitudeservice } from 'src/app/admin/service/solicitud.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-solicitud',
  templateUrl: './modificar-solicitud.component.html',
  styleUrls: ['./modificar-solicitud.component.scss']
})
export class ModificarSolicitudComponent implements OnInit {

  SolicitudDialog: boolean = false;

  EditarSolicitudDialog: boolean = false;

  deleteSolicitudDialog: boolean = false;

  deleteSolicitudesDialog: boolean = false;

  selectedSolicitudes: Solicitud[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  Solicitud: Solicitud = {
    solicitud: '',
    nombre_cliente: '',
    categoria_servicio: 0,
    cantidad: 0,
    descripción: '',
    estado_solicitud: 0,
    servicios: [],
    fecha_envio: ''
  };



  SolicitudesForm!: FormGroup;

  modificarSolicitudForm!: FormGroup;

  Solicituds: Solicitud[] = [];

  SolicitudSeleccionado!: Solicitud;

  constructor(
    private solicitudService: Solicitudeservice,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSolicitudes();
    this.initForm();
  

    this.cols = [
      { field: 'asunto_solicitud', header: 'asunto_solicitud' },
      { field: 'nombre_cliente', header: 'nombre_cliente' },
      { field: 'servicio', header: 'servicio' },
      { field: 'cantidad', header: 'cantidad' },
      { field: 'descripción', header: 'descripción' },
      { field: 'estado_solicitud', header: 'estado_solicitud' },
      { field: 'fecha_envio', header: 'fecha_envio' }

  ];

    this.statuses = [
      { label: 'Pendiente', value: '0' },
      { label: 'Aprobada', value: '1' },
      { label: 'Rechazada', value: '2' },
      { label: 'Enviada', value: '3' },
    ];

 

  }

  initForm(): void {
    this.SolicitudesForm = this.formBuilder.group({
      servicios:  ['', Validators.required],
      nombre_cliente:  ['', Validators.required],
      categoria_servicio:  ['1', Validators.required],
      servicio:  ['', Validators.required],
      cantidad:  ['', Validators.required],
      descripción: ['', Validators.required],
      estado_solicitud:  ['1', Validators.required],
      fecha_envio:  [''],
      
    });
  }

  saveSolicitud(): void {
    this.submitted = true;

  
    if (this.SolicitudesForm.invalid) {
      return;
    }
  
    const formData = this.SolicitudesForm.value;
  
   
  
    this.solicitudService.saveSolicitud(formData).subscribe(
      (response) => {
        console.log('Solicitud registrado exitosamente:', response);
        this.getSolicitudes();
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado exitoso',
          detail: 'Registrado correctamente',
          life: 3000,
        });
        this.SolicitudDialog = false;
      },
      (error) => {
        console.log('Error al registrar el Solicitud:', error);
      }
    );
  }
  
  updateSolicitud(): void {
    this.submitted = true;

 
    const formData = this.SolicitudesForm.value;

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
    this.SolicitudesForm.reset();
  }

  deleteselectedSolicitudes() {
    this.deleteSolicitudesDialog = true;
  }

  editServicioMaterial(Solicitud: Solicitud) {
    if (Solicitud) {
      this.SolicitudSeleccionado = Solicitud;
      this.SolicitudesForm.patchValue({
        servicios: Solicitud.servicios,
        nombre_cliente: Solicitud.nombre_cliente,
        categoria_servicio: Solicitud.categoria_servicio,
        // servicio: Solicitud.servicio,
        cantidad: Solicitud.cantidad,
        descripción: Solicitud.descripción,
        estado_solicitud: Solicitud.estado_solicitud,
        fecha_envio: Solicitud.fecha_envio
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
