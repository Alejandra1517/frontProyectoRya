import { Component, OnInit } from '@angular/core';
import { Cotizacion } from 'src/app/admin/models/cotizacion';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { cotizacionservice } from 'src/app/admin/service/cotizacion.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})
export class CotizacionesComponent implements OnInit {

  CotizacionDialog: boolean = false;

  EditarCotizacionDialog: boolean = false;

  deleteCotizacionDialog: boolean = false;

  deleteCotizacionesDialog: boolean = false;

  selectedCotizaciones: Cotizacion[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  Cotizacion: Cotizacion = {
    _id: '',
    solicitud: '',
    materiales: '',
    servicios: '',
    nombre_cliente: '',
    servicio: '',
    cantidad: 0,
    descripción: '',
    subtotal: 0,
    fecha_vencimiento: new Date,
    mano_obra: 0,
    total_servicio: 0,
    estado_cotizacion_cliente: 0,
    estado_cotizacion: 0,
    estado_solicitud: 0
  };



  CotizacionsForm!: FormGroup;

  modificarCotizacionForm!: FormGroup;

  Cotizacions: Cotizacion[] = [];

  CotizacionSeleccionado!: Cotizacion;

  constructor(
    private cotizacionService: cotizacionservice,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCotizacions();
    this.initForm();
  

    this.cols = [
      { field: 'nombre_cliente', header: 'Nombre Cotizacion' },
      { field: 'servicio', header: 'Nombre Cotizacion' },
      { field: 'cantidad', header: 'Nombre Cotizacion' },
      { field: 'descripción', header: 'Nombre Cotizacion' },
      { field: 'subtotal', header: 'Nombre Cotizacion' },
      { field: 'fecha_vencimiento', header: 'fecha_vencimiento' },
      { field: 'mano_obra', header: 'mano_obra' },
      { field: 'total_servicio', header: 'total_servicio' },
      { field: 'estado_cotizacion_cliente', header: 'estado_cotizacion_cliente' },
      { field: 'estado_cotizacion', header: 'estado_cotizacion' },
      { field: 'estado_solicitud', header: 'estado_solicitud' },
  ];

    this.statuses = [
      { label: 'Activo', value: '1' },
      { label: 'Inactivo', value: '0' },
    ];

 

  }

  initForm(): void {
    this.CotizacionsForm = this.formBuilder.group({
      nombre_cliente: ['', Validators.required],
      servicio: ['', Validators.required],
      cantidad: ['', Validators.required],
      descripción: ['',],
      subtotal: ['',],
      fecha_vencimiento: ['',],
      mano_obra: ['',],
      total_servicio: ['',],
      estado_cotizacion_cliente: ['',],
      estado_cotizacion: ['',],
      estado_solicitud: ['',]
    });
  }

  saveCotizacion(): void {
    this.submitted = true;

  
    if (this.CotizacionsForm.invalid) {
      return;
    }
  
    const formData = this.CotizacionsForm.value;
  
   
  
    this.cotizacionService.saveCotizacion(formData).subscribe(
      (response) => {
        console.log('Cotizacion registrado exitosamente:', response);
        this.getCotizacions();
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado exitoso',
          detail: 'Registrado correctamente',
          life: 3000,
        });
        this.CotizacionDialog = false;
      },
      (error) => {
        console.log('Error al registrar el Cotizacion:', error);
      }
    );
  }
  
  updateCotizacion(): void {
    this.submitted = true;

 
    const formData = this.CotizacionsForm.value;

    formData.id_Cotizacion = this.CotizacionSeleccionado._id; // Agrega el ID del Cotizacion al formulario

    this.cotizacionService.updateCotizacion(formData.id_Cotizacion, formData).subscribe(
      (response) => {
        console.log('Cotizacion actualizado exitosamente:', response);
        this.getCotizacions();
        this.messageService.add({
          severity: 'success',
          summary: 'Actualización exitosa',
          detail: 'Cotizacion actualizado correctamente',
          life: 3000,
        });
        this.EditarCotizacionDialog = false;
      },
      (error) => {
        console.log('Error al actualizar el Cotizacion:', error);
      }
    );
  }


  getCotizacions(): void {
    this.cotizacionService.getCotizaciones().subscribe(
      (Cotizaciones: Cotizacion[]) => {
        this.Cotizacions = Cotizaciones;

        console.log(this.Cotizacions)
      },
      (error) => {
        console.log('Error al obtener los empleados:', error);
      }
    );
  }


  openNew() {
    this.submitted = false;
    this.CotizacionDialog = true;
    this.CotizacionsForm.reset();

    this.router.navigate(['/admin/crear-cotizacion']);

  }

  deleteselectedCotizaciones() {
    this.deleteCotizacionesDialog = true;
  }

  editCotizacion(Cotizacion: Cotizacion) {
    if (Cotizacion) {
      this.CotizacionSeleccionado = Cotizacion;
      this.CotizacionsForm.patchValue({
        nombre_cliente: Cotizacion.nombre_cliente,
        servicio: Cotizacion.servicio,
        cantidad: Cotizacion.cantidad,
        descripción: Cotizacion.descripción,
        subtotal: Cotizacion.subtotal,
        fecha_vencimiento: Cotizacion.fecha_vencimiento,
        mano_obra: Cotizacion.mano_obra,
        total_servicio: Cotizacion.total_servicio,
        estado_cotizacion_cliente: Cotizacion.estado_cotizacion_cliente,
        estado_cotizacion: Cotizacion.estado_cotizacion,
        estado_solicitud: Cotizacion.estado_solicitud
      });


      this.submitted = false;
      this.EditarCotizacionDialog = true; // Utiliza la propiedad correcta
      
      this.router.navigate(['/admin/modificar-cotizacion']);

    }
  }


  deleteCotizacion(Cotizacion: Cotizacion) {
    this.CotizacionSeleccionado = Cotizacion;
    this.deleteCotizacionDialog = true;
  }

  confirmDelete() {
    if (
      this.CotizacionSeleccionado &&
      typeof this.CotizacionSeleccionado._id === 'string'
    ) {
      this.deleteCotizacionDialog = false;

      this.cotizacionService.deleteCotizacion(this.CotizacionSeleccionado._id).subscribe(
        (response) => {
          console.log('Cotizacion eliminado exitosamente:', response);
          this.getCotizacions();
        },
        (error) => {
          console.log('Error al eliminar el Cotizacion:', error);
        }
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Acción exitosa',
        detail: 'Cotizacion eliminado',
        life: 3000,
      });
    }
  }

  confirmDeleteSelected() {
    this.deleteCotizacionDialog = false;

    this.Cotizacions = this.Cotizacions.filter(val => !this.selectedCotizaciones.includes(val)); //Elimina los productos seleccionados del array products 
    
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cotizaciones eliminados', life: 3000 });
    
    this.selectedCotizaciones = []; //indica que ya no hay productos seleccionados para eliminar

}

  seleccionarCotizacion(Cotizacion: Cotizacion) {
    this.CotizacionSeleccionado = Cotizacion;
  }

  hideDialog() {
    this.CotizacionDialog = false;
    this.EditarCotizacionDialog = false; // Asegúrate de ocultar la ventana modal de edición también
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
