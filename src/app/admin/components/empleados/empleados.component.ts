import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/admin/models/empleados';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EmpleadoService } from 'src/app/admin/service/empleados.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  providers: [MessageService]
})


export class EmpleadosComponent implements OnInit {
  EmpleadoDialog: boolean = false;
  EditarEmpleadoDialog: boolean = false;
  deleteEmpleadoDialog: boolean = false;
  deleteEmpleadosDialog: boolean = false;
  selectedEmpleados: Empleado[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  Empleado: Empleado = {
    _id: '',
    nombre: '',
    telefono: '',
    documento: '',
    direccion: '',
    estado: 0
  };
  empleadosForm!: FormGroup;
  modificarEmpleadoForm!: FormGroup;
  Empleados: Empleado[] = [];
  empleadoSeleccionado!: Empleado;

  constructor(
    private empleadoService: EmpleadoService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
    this.initForm();

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'documento', header: 'Documento' },
      { field: 'telefono', header: 'Télefono' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'estado', header: 'Estado' }
  ];

    this.statuses = [
      { label: 'ACTIVO', value: '1' },
      { label: 'INACTIVO', value: '0' },
    ];
  }

  initForm(): void {
    this.empleadosForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      documento: ['', Validators.required],
      direccion: ['', Validators.required],
      estado: ['1', Validators.required],
    });
  }

  saveEmpleado(): void {
    this.submitted = true;

    if (this.empleadosForm.invalid) {
      return;
    }

    const formData = this.empleadosForm.value;
    this.empleadoService.saveEmpleado(formData).subscribe(
      (response) => {
        console.log('Empleado registrado exitosamente:', response);
        this.getEmpleados();
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado exitoso',
          detail: 'Registrado correctamente',
          life: 3000,
        });
        this.EmpleadoDialog = false;
      },
      (error) => {
        console.log('Error al registrar el empleado:', error);
      }
    );
  }


  updateEmpleado(): void {
    this.submitted = true;

 
    const formData = this.empleadosForm.value;

    formData.id_empleado = this.empleadoSeleccionado._id; // Agrega el ID del empleado al formulario

    this.empleadoService.updateEmpleado(formData.id_empleado, formData).subscribe(
      (response) => {
        console.log('Empleado actualizado exitosamente:', response);
        this.getEmpleados();
        this.messageService.add({
          severity: 'success',
          summary: 'Actualización exitosa',
          detail: 'Empleado actualizado correctamente',
          life: 3000,
        });
        this.EditarEmpleadoDialog = false;
      },
      (error) => {
        console.log('Error al actualizar el empleado:', error);
      }
    );
  }

  // getEmpleados(): void {
  //   this.empleadoService.getEmpleados().subscribe(
  //     (response: Empleado[]) => {
  //       this.Empleados = response;
  //     },
  //     (error) => {
  //       console.log('Error al obtener los empleados:', error);
  //     }
  //   );
  // }


  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (empleados: Empleado[]) => {
        this.Empleados = empleados;
      },
      (error) => {
        console.log('Error al obtener los empleados:', error);
      }
    );
  }



  openNew() {
    this.submitted = false;
    this.EmpleadoDialog = true;
    this.empleadosForm.reset();
  }

  deleteSelectedEmpleados() {
    this.deleteEmpleadosDialog = true;
  }

  editEmpleado(empleado: Empleado) {
    if (empleado) {
      this.empleadoSeleccionado = empleado;
      this.empleadosForm.patchValue({
        nombre: empleado.nombre,
        telefono: empleado.telefono,
        documento: empleado.documento,
        direccion: empleado.direccion,
        estado: empleado.estado,
      });
      this.submitted = false;
      this.EditarEmpleadoDialog = true; // Utiliza la propiedad correcta
    }
  }


  deleteEmpleado(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
    this.deleteEmpleadoDialog = true;
  }

  confirmDelete() {
    if (
      this.empleadoSeleccionado &&
      typeof this.empleadoSeleccionado._id === 'string'
    ) {
      this.deleteEmpleadoDialog = false;

      this.empleadoService.deleteEmpleado(this.empleadoSeleccionado._id).subscribe(
        (response) => {
          console.log('Empleado eliminado exitosamente:', response);
          this.getEmpleados();
        },
        (error) => {
          console.log('Error al eliminar el empleado:', error);
        }
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Acción exitosa',
        detail: 'Empleado eliminado',
        life: 3000,
      });
    }
  }

  confirmDeleteSelected() {
    this.deleteEmpleadoDialog = false;

    this.Empleados = this.Empleados.filter(val => !this.selectedEmpleados.includes(val)); //Elimina los productos seleccionados del array products 
    
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    
    this.selectedEmpleados = []; //indica que ya no hay productos seleccionados para eliminar

}

  seleccionarEmpleado(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
  }

  hideDialog() {
    this.EmpleadoDialog = false;
    this.EditarEmpleadoDialog = false; // Asegúrate de ocultar la ventana modal de edición también
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}