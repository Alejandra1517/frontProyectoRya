import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/admin/models/servicios';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ServicioServiceService } from 'src/app/admin/service/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [MessageService]
})
export class ServiciosComponent implements OnInit {
  ServicioDialog: boolean = false;
  EditarServicioDialog: boolean = false;
  deleteServicioDialog: boolean = false;
  deleteServiciosDialog: boolean = false;
  selectedServicios: Servicio[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  categorias: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  Servicio: Servicio = {
    id_servicio: 0,
    nombre_servicio: '',
    categoria: 0,
    valor_unitario: 0,
    estado: 0,
    imagen: '',
    descripcion: '',
  };
  ServiciosForm!: FormGroup;
  modificarServicioForm!: FormGroup;
  Servicios: Servicio[] = [];
  ServicioSeleccionado!: Servicio;

  constructor(
    private servicioServiceService: ServicioServiceService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getServicios();
    this.initForm();
  

    this.cols = [
      { field: 'nombre_servicio', header: 'Nombre Servicio' },
      { field: 'categoria', header: 'Categoría' },
      { field: 'valor_unitario', header: 'Valor unitario' },
      { field: 'estado', header: 'Estado' },
      { field: 'descripcion', header: 'Descripción' },
      // { field: 'imagen', header: 'Imagen' }

  ];

    this.statuses = [
      { label: 'ACTIVO', value: '1' },
      { label: 'INACTIVO', value: '0' },
    ];

    this.categorias = [
      { label: 'Obra blanca', value: '0' },
      { label: 'Obra negra', value: '1' },
      { label: 'Obra gris', value: '2' },
    ];

  }

  initForm(): void {
    this.ServiciosForm = this.formBuilder.group({
      nombre_servicio: ['', Validators.required],
      categoria: ['', Validators.required],
      valor_unitario: ['', Validators.required],
      estado: ['1', Validators.required],
      descripcion: ['',],
    });
  }

  saveServicio(): void {
    this.submitted = true;
    this.Servicio.imagen = 'product-placeholder.svg';
  
    if (this.ServiciosForm.invalid) {
      return;
    }
  
    const formData = this.ServiciosForm.value;
  
    if (!formData.descripcion) {
      formData.descripcion = 'Sin descripción';
    }
  
    this.servicioServiceService.saveServicio(formData).subscribe(
      (response) => {
        console.log('Servicio registrado exitosamente:', response);
        this.getServicios();
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado exitoso',
          detail: 'Registrado correctamente',
          life: 3000,
        });
        this.ServicioDialog = false;
      },
      (error) => {
        console.log('Error al registrar el Servicio:', error);
      }
    );
  }
  
  updateServicio(): void {
    this.submitted = true;

 
    const formData = this.ServiciosForm.value;

    formData.id_Servicio = this.ServicioSeleccionado.id_servicio; // Agrega el ID del Servicio al formulario

    this.servicioServiceService.updateServicio(formData.id_Servicio, formData).subscribe(
      (response) => {
        console.log('Servicio actualizado exitosamente:', response);
        this.getServicios();
        this.messageService.add({
          severity: 'success',
          summary: 'Actualización exitosa',
          detail: 'Servicio actualizado correctamente',
          life: 3000,
        });
        this.EditarServicioDialog = false;
      },
      (error) => {
        console.log('Error al actualizar el Servicio:', error);
      }
    );
  }




  getServicios(): void {
    this.servicioServiceService.getServicio().subscribe(
      (response: Servicio[]) => {
        this.Servicios = response;
      },
      (error) => {
        console.log('Error al obtener los Servicios:', error);
      }
    );
  }

  openNew() {
    this.submitted = false;
    this.ServicioDialog = true;
    this.ServiciosForm.reset();
  }

  deleteSelectedServicios() {
    this.deleteServiciosDialog = true;
  }

  editServicio(Servicio: Servicio) {
    if (Servicio) {
      this.ServicioSeleccionado = Servicio;
      this.ServiciosForm.patchValue({
        nombre_servicio: Servicio.nombre_servicio,
        categoria: Servicio.categoria,
        valor_unitario: Servicio.valor_unitario,
        estado: Servicio.estado,
        descripcion: Servicio.descripcion,
        
      });
      this.submitted = false;
      this.EditarServicioDialog = true; // Utiliza la propiedad correcta
    }
  }


  deleteServicio(Servicio: Servicio) {
    this.ServicioSeleccionado = Servicio;
    this.deleteServicioDialog = true;
  }

  confirmDelete() {
    if (
      this.ServicioSeleccionado &&
      typeof this.ServicioSeleccionado.id_servicio === 'number'
    ) {
      this.deleteServicioDialog = false;

      this.servicioServiceService.deleteServicio(this.ServicioSeleccionado.id_servicio).subscribe(
        (response) => {
          console.log('Servicio eliminado exitosamente:', response);
          this.getServicios();
        },
        (error) => {
          console.log('Error al eliminar el Servicio:', error);
        }
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Acción exitosa',
        detail: 'Servicio eliminado',
        life: 3000,
      });
    }
  }

  confirmDeleteSelected() {
    this.deleteServicioDialog = false;

    this.Servicios = this.Servicios.filter(val => !this.selectedServicios.includes(val)); //Elimina los productos seleccionados del array products 
    
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    
    this.selectedServicios = []; //indica que ya no hay productos seleccionados para eliminar

}

  seleccionarServicio(Servicio: Servicio) {
    this.ServicioSeleccionado = Servicio;
  }

  hideDialog() {
    this.ServicioDialog = false;
    this.EditarServicioDialog = false; // Asegúrate de ocultar la ventana modal de edición también
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
