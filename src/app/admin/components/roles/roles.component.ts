import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Rol } from '../../models/roles';
import { RolService } from '../../service/rol.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [MessageService]
  
})
export class RolesComponent {


  
  RolDialog: boolean = false;

  EditarRolDialog: boolean = false;

  deleteRolDialog: boolean = false;

  deleteRolesDialog: boolean = false;

  selectedRoles: Rol[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];


  valSwitch: boolean = false;

  rowsPerPageOptions = [5, 10, 20];
  Rol: Rol = {
    id_rol: '',
    nombre_rol: '',
    estado: 0,
  };



  RolsForm!: FormGroup;

  modificarRolForm!: FormGroup;

  Rols: Rol[] = [];

  RolSeleccionado!: Rol;

  constructor(
    private rolService: RolService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRols();
    this.initForm();
  

    this.cols = [
      { field: 'nombre_Rol', header: 'Nombre Rol' },
      { field: 'proveedor', header: 'Proveedor' },
      { field: 'estado', header: 'Estado' },
      { field: 'fecha ingreso', header: 'Fecha ingreso' },
      // { field: 'imagen', header: 'Imagen' }

  ];

    this.statuses = [
      { label: 'Activo', value: '1' },
      { label: 'Inactivo', value: '0' },
    ];

 

  }

  initForm(): void {
    this.RolsForm = this.formBuilder.group({
      nombre_rol: ['', Validators.required],
      estado: ['1', Validators.required],
    });
  }

  saveRol(): void {
    this.submitted = true;

  
    if (this.RolsForm.invalid) {
      return;
    }
  
    const formData = this.RolsForm.value;
  
   
  
    this.rolService.saveRol(formData).subscribe(
      (response) => {
        console.log('Rol registrado exitosamente:', response);
        this.getRols();
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado exitoso',
          detail: 'Registrado correctamente',
          life: 3000,
        });
        this.RolDialog = false;
      },
      (error) => {
        console.log('Error al registrar el Rol:', error);
      }
    );
  }
  
  updateRol(): void {
    this.submitted = true;

 
    const formData = this.RolsForm.value;

    formData.id_rol = this.RolSeleccionado.id_rol; // Agrega el ID del Rol al formulario

    this.rolService.updateRol(formData.id_Rol, formData).subscribe(
      (response) => {
        console.log('Rol actualizado exitosamente:', response);
        this.getRols();
        this.messageService.add({
          severity: 'success',
          summary: 'Actualización exitosa',
          detail: 'Rol actualizado correctamente',
          life: 3000,
        });
        this.EditarRolDialog = false;
      },
      (error) => {
        console.log('Error al actualizar el Rol:', error);
      }
    );
  }




  // getRols(): void {
  //   this.rolService.getRol().subscribe(
  //     (response: Rol[]) => {
  //       this.Rols = response;
  //     },
  //     (error) => {
  //       console.log('Error al obtener los Rols:', error);
  //     }
  //   );
  // }


  getRols(): void {
    this.rolService.getRoles().subscribe(
      (roles: Rol[]) => {
        this.Rols = roles;
      },
      (error) => {
        console.log('Error al obtener los empleados:', error);
      }
    );
  }


  openNew() {
    this.submitted = false;
    this.RolDialog = true;
    this.RolsForm.reset();
  }

  deleteselectedRoles() {
    this.deleteRolesDialog = true;
  }

  editRol(Rol: Rol) {
    if (Rol) {
      this.RolSeleccionado = Rol;
      this.RolsForm.patchValue({
        nombre_rol: Rol.nombre_rol,
        estado: Rol.estado
        
      });
      this.submitted = false;
      this.EditarRolDialog = true; // Utiliza la propiedad correcta
    }
  }


  deleteRol(Rol: Rol) {
    this.RolSeleccionado = Rol;
    this.deleteRolDialog = true;
  }

  confirmDelete() {
    if (
      this.RolSeleccionado &&
      typeof this.RolSeleccionado.id_rol === 'string'
    ) {
      this.deleteRolDialog = false;

      this.rolService.deleteRol(this.RolSeleccionado.id_rol).subscribe(
        (response) => {
          console.log('Rol eliminado exitosamente:', response);
          this.getRols();
        },
        (error) => {
          console.log('Error al eliminar el Rol:', error);
        }
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Acción exitosa',
        detail: 'Rol eliminado',
        life: 3000,
      });
    }
  }

  confirmDeleteSelected() {
    this.deleteRolDialog = false;

    this.Rols = this.Rols.filter(val => !this.selectedRoles.includes(val)); //Elimina los productos seleccionados del array products 
    
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Roles eliminados', life: 3000 });
    
    this.selectedRoles = []; //indica que ya no hay productos seleccionados para eliminar

}

  seleccionarRol(Rol: Rol) {
    this.RolSeleccionado = Rol;
  }

  hideDialog() {
    this.RolDialog = false;
    this.EditarRolDialog = false; // Asegúrate de ocultar la ventana modal de edición también
    this.submitted = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
