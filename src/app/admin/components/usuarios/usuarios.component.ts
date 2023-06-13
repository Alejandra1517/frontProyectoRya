import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsuarioService } from 'src/app/admin/service/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuarios';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [MessageService]
})
export class UsuariosComponent {

  UsuarioDialog: boolean = false;
  EditarUsuarioDialog: boolean = false;
  deleteUsuarioDialog: boolean = false;
  deleteUsuariosDialog: boolean = false;
  selectedUsuarios: Usuario[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  Usuario: Usuario = {
    id_usuario: 0,
    username: '',
    password: '',
    estado: 0
  };
  usuariosForm!: FormGroup;
  modificarUsuarioForm!: FormGroup;
  Usuarios: Usuario[] = [];
  clienteSeleccionado!: Usuario;

  constructor(
    private clienteService: UsuarioService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
    this.initForm();

    this.cols = [
      { field: 'nombre_cliente', header: 'Nombre Usuario' },
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
    this.usuariosForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      estado: ['1', Validators.required],
    });
  }

  saveUsuario(): void {
    this.submitted = true;

    if (this.usuariosForm.invalid) {
      return;
    }

    const formData = this.usuariosForm.value;
    this.clienteService.saveUsuario(formData).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente:', response);
        this.getUsuarios();
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado exitoso',
          detail: 'Registrado correctamente',
          life: 3000,
        });
        this.UsuarioDialog = false;
      },
      (error) => {
        console.log('Error al registrar el cliente:', error);
      }
    );
  }


  updateUsuario(): void {
    this.submitted = true;

 
    const formData = this.usuariosForm.value;

    formData.id_usuario = this.clienteSeleccionado.id_usuario; // Agrega el ID del cliente al formulario

    this.clienteService.updateUsuario(formData.id_cliente, formData).subscribe(
      (response) => {
        console.log('Usuario actualizado exitosamente:', response);
        this.getUsuarios();
        this.messageService.add({
          severity: 'success',
          summary: 'Actualización exitosa',
          detail: 'Usuario actualizado correctamente',
          life: 3000,
        });
        this.EditarUsuarioDialog = false;
      },
      (error) => {
        console.log('Error al actualizar el cliente:', error);
      }
    );
  }

  getUsuarios(): void {
    this.clienteService.getUsuarios().subscribe(
      (response: Usuario[]) => {
        this.Usuarios = response;
      },
      (error) => {
        console.log('Error al obtener los usuarios:', error);
      }
    );
  }

  openNew() {
    this.submitted = false;
    this.UsuarioDialog = true;
    this.usuariosForm.reset();
  }

  deleteSelectedUsuarios() {
    this.deleteUsuariosDialog = true;
  }

  editUsuario(cliente: Usuario) {
    if (cliente) {
      this.clienteSeleccionado = cliente;
      this.usuariosForm.patchValue({
        username: cliente.username,
        password: cliente.password,
        estado: cliente.estado,
      });
      this.submitted = false;
      this.EditarUsuarioDialog = true; // Utiliza la propiedad correcta
    }
  }


  deleteUsuario(cliente: Usuario) {
    this.clienteSeleccionado = cliente;
    this.deleteUsuarioDialog = true;
  }

  confirmDelete() {
    if (
      this.clienteSeleccionado &&
      typeof this.clienteSeleccionado.id_usuario === 'number'
    ) {
      this.deleteUsuarioDialog = false;

      this.clienteService.deleteUsuario(this.clienteSeleccionado.id_usuario).subscribe(
        (response) => {
          console.log('Usuario eliminado exitosamente:', response);
          this.getUsuarios();
        },
        (error) => {
          console.log('Error al eliminar el cliente:', error);
        }
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Acción exitosa',
        detail: 'Usuario eliminado',
        life: 3000,
      });
    }
  }

  confirmDeleteSelected() {
    this.deleteUsuarioDialog = false;

    this.Usuarios = this.Usuarios.filter(val => !this.selectedUsuarios.includes(val)); //Elimina los productos seleccionados del array products 
    
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    
    this.selectedUsuarios = []; //indica que ya no hay productos seleccionados para eliminar

}

  seleccionarUsuario(cliente: Usuario) {
    this.clienteSeleccionado = cliente;
  }

  hideDialog() {
    this.UsuarioDialog = false;
    this.EditarUsuarioDialog = false; // Asegúrate de ocultar la ventana modal de edición también
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }



}
