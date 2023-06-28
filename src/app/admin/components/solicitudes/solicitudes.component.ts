import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/admin/models/solicitud';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Solicitudeservice } from 'src/app/admin/service/solicitud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
  providers: [MessageService]

})
export class SolicitudesComponent implements OnInit {
    solicitudDialog: boolean = false;
    EditarsolicitudDialog: boolean = false;
    deletesolicitudDialog: boolean = false;
    deletesolicitudsDialog: boolean = false;
    selectedsolicitud: Solicitud[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    solicitud: Solicitud = {
      _id: '',
      nombre_cliente: '',
      estado: 0,
      servicio: '',
      cantidad: 0,
      descripcion: '',
      subtotal: 0,
      fecha_vencimiento: new Date(),
      mano_obra: 0,
      categoria_servicio: '',
      total_servicio: 0,
      nombre_material: '',
      precio_unitario: 0
    };
    solicitudsForm!: FormGroup;
    modificarsolicitudForm!: FormGroup;
    solicituds: Solicitud[] = [];
    solicitudSeleccionado!: Solicitud;
  
    constructor(
      private solicitudService: Solicitudeservice,
      private messageService: MessageService,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.getsolicituds();
      this.initForm();
  
      this.cols = [
        { field: 'nombre_cliente', header: 'Nombre cliente' },
        { field: 'estado', header: 'Documento' },
        { field: 'servicio', header: 'Télefono' },
        { field: 'cantidad', header: 'Dirección' },
        { field: 'descripcion', header: 'Estado' },
        { field: 'subtotal', header: 'Estado' },
        { field: 'fecha_vencimiento', header: 'Estado' },
        { field: 'mano_obra', header: 'Estado' },
        { field: 'categoria_servicio', header: 'Estado' },
        { field: 'total_servicio', header: 'Estado' },
        { field: 'nombre_material', header: 'Estado' },
        { field: 'precio_unitario', header: 'Estado' },

    ];
  
      this.statuses = [
        { label: 'ACTIVO', value: '1' },
        { label: 'INACTIVO', value: '0' },
      ];
    }
  
    initForm(): void {
      this.solicitudsForm = this.formBuilder.group({
        nombre_cliente: ['', Validators.required],
        estado: ['1', Validators.required],
        servicio: ['', Validators.required],
        cantidad: ['', Validators.required],
        descripcion: ['', Validators.required],
        subtotal: ['', Validators.required],
        fecha_vencimiento: ['', Validators.required],
        mano_obra: ['', Validators.required],
        categoria_servicio: ['', Validators.required],
        total_servicio: ['', Validators.required],
        nombre_material: ['', Validators.required],
        precio_unitario: ['', Validators.required],
      });
    }
  
    savesolicitud(): void {
      this.submitted = true;
  
      if (this.solicitudsForm.invalid) {
        return;
      }
  
      const formData = this.solicitudsForm.value;
      this.solicitudService.saveSolicitud(formData).subscribe(
        (response) => {
          console.log('solicitud registrado exitosamente:', response);
          this.getsolicituds();
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado exitoso',
            detail: 'Registrado correctamente',
            life: 3000,
          });
          this.solicitudDialog = false;
        },
        (error) => {
          console.log('Error al registrar el solicitud:', error);
        }
      );
    }
  
  
    updatesolicitud(): void {
      this.submitted = true;
  
   
      const formData = this.solicitudsForm.value;
  
      formData.id_solicitud = this.solicitudSeleccionado._id; // Agrega el ID del solicitud al formulario
  
      this.solicitudService.updateSolicitud(formData.id_solicitud, formData).subscribe(
        (response) => {
          console.log('solicitud actualizado exitosamente:', response);
          this.getsolicituds();
          this.messageService.add({
            severity: 'success',
            summary: 'Actualización exitosa',
            detail: 'solicitud actualizado correctamente',
            life: 3000,
          });
          this.EditarsolicitudDialog = false;
        },
        (error) => {
          console.log('Error al actualizar el solicitud:', error);
        }
      );
    }
  
  
    getsolicituds(): void {
      this.solicitudService.getSolicitudes().subscribe(
        (solicituds: Solicitud[]) => {
          this.solicituds = solicituds;
        },
        (error) => {
          console.log('Error al obtener los solicituds:', error);
        }
      );
    }
    
  
  
    openNew() {
      this.submitted = false;
      this.solicitudDialog = true;
      this.solicitudsForm.reset();
    }
  
    deleteSelectedsolicitud() {
      this.deletesolicitudsDialog = true;
    }
  
    editsolicitud(solicitud: Solicitud) {
      if (solicitud) {
        this.solicitudSeleccionado = solicitud;
        this.solicitudsForm.patchValue({
          nombre_cliente: solicitud.nombre_cliente,
          estado: solicitud.estado,
          servicio: solicitud.servicio,
          cantidad: solicitud.cantidad,
          descripcion: solicitud.descripcion,
          subtotal: solicitud.subtotal,
          fecha_vencimiento: solicitud.fecha_vencimiento,
          mano_obra: solicitud.mano_obra,
          categoria_servicio: solicitud.categoria_servicio,
          total_servicio: solicitud.total_servicio,
          nombre_material: solicitud.nombre_material,
          precio_unitario: solicitud.precio_unitario,
        });
        this.submitted = false;
        this.EditarsolicitudDialog = true; // Utiliza la propiedad correcta
      }
    }
  
  
    deletesolicitud(solicitud: Solicitud) {
      this.solicitudSeleccionado = solicitud;
      this.deletesolicitudDialog = true;
    }
  
    confirmDelete() {
      if (
        this.solicitudSeleccionado &&
        typeof this.solicitudSeleccionado._id === 'string'
      ) {
        this.deletesolicitudDialog = false;
  
        console.log(this.solicitudSeleccionado._id)
        this.solicitudService.deleteSolicitud(this.solicitudSeleccionado._id).subscribe(
          (response) => {
            console.log('solicitud eliminado exitosamente:', response);
            this.getsolicituds();
          },
          (error) => {
            console.log('Error al eliminar el solicitud:', error);
          }
        );
  
        this.messageService.add({
          severity: 'success',
          summary: 'Acción exitosa',
          detail: 'solicitud eliminado',
          life: 3000,
        });
      }
    }
  
  
    eliminarRegistros(): void {
      this.solicitudService.deleteAllSolicitudes().subscribe(
        response => {
          console.log(response.msg);
          // Aquí puedes realizar las acciones adicionales que necesites
        },
        error => {
          console.error(error);
          // Manejo de errores
        }
      );
    }
  
  
  
    confirmDeleteSelected() {
      this.deletesolicitudDialog = false;
  
      this.solicituds = this.solicituds.filter(val => !this.selectedsolicitud.includes(val)); //Elimina los productos seleccionados del array products 
      
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      
      this.selectedsolicitud = []; //indica que ya no hay productos seleccionados para eliminar
  
  }
  
    seleccionarsolicitud(solicitud: Solicitud) {
      this.solicitudSeleccionado = solicitud;
    }
  
    hideDialog() {
      this.solicitudDialog = false;
      this.EditarsolicitudDialog = false; // Asegúrate de ocultar la ventana modal de edición también
      this.submitted = false;
    }
  
  
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
