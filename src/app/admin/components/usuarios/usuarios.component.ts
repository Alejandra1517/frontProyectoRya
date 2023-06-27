import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsuarioService } from 'src/app/admin/service/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuarios';



import { RolService } from 'src/app/admin/service/rol.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  // providers: [MessageService]
})
export class UsuariosComponent implements OnInit{

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
    _id: '',
    username: '',
    nombre_completo: '',
    documento: '',
    telefono: '',
    direccion: '',
    password: '',
    estado: 0,
    id_rol: ''
  };



  usuariosForm!: FormGroup;
  modificarUsuarioForm!: FormGroup;
  Usuarios: Usuario[] = [];
  usuarioSeleccionado!: Usuario;

  constructor(
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}



  rolNames: { [key: string]: string } = {};


  roles: any[] = [];
  
  selectedRol: any;


  onRolChange(event: any) {
    this.selectedRol = event.value;
    this.usuariosForm.patchValue({ id_rol: this.selectedRol.id_rol });
    console.log('hello', this.selectedRol)
  }
  

  selectAll: boolean = false;

  
  toggleSelectAll() {
    if (this.selectedUsuarios.length === this.Usuarios.length) {
        this.selectedUsuarios = [];
        this.selectAll = false;
    } else {
        this.selectedUsuarios = [...this.Usuarios];
        this.selectAll = true;
    }
}

  
  ngOnInit() {
    

    this.rolService.getRoles().subscribe(
      (data) => {
        this.roles = data;

        console.log(this.roles)
      },
      (error) => {
        console.error(error);
      }
    );



    this.getUsuarios();
    this.initForm();

    this.cols = [
      { field: 'nombre_usuario', header: 'Nombre Usuario' },
      { field: 'documento', header: 'Documento' },
      { field: 'telefono', header: 'Télefono' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'estado', header: 'Estado' },
      { field: 'id_rol', header: 'Rol' }
  ];

    this.statuses = [
      { label: 'ACTIVO', value: '1' },
      { label: 'INACTIVO', value: '0' },
    ];
  }

  initForm(): void {
    this.usuariosForm = this.formBuilder.group({
      username: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      documento: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      password: ['', Validators.required],
      estado: ['1', Validators.required],
      id_rol: ['', Validators.required]
    });
  }


  getRolName(id_rol: any): string {
    const rol = this.roles.find((r: any) => r.id_rol === id_rol);
    return rol ? rol.nombre_rol : '';
  }
  

  saveUsuario(): void {


    this.submitted = true;

    if (this.usuariosForm.invalid) {
      return;
    }

    const formData = this.usuariosForm.value;


    this.usuarioService.saveUsuario(formData).subscribe(
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
        console.log('Error al registrar el usuario:', error);
      }
    );
  }


  updateUsuario(): void {
    this.submitted = true;

 
    const formData = this.usuariosForm.value;

    formData._id = this.usuarioSeleccionado._id; // Agrega el ID del usuario al formulario

    this.usuarioService.updateUsuario(formData._id, formData).subscribe(
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
        console.log('Error al actualizar el usuario:', error);
      }
    );
  }

  // getUsuarios(): void {
  //   this.usuarioService.getUsuarios().subscribe(
  //     (response: Usuario[]) => {
  //       this.Usuarios = response;
  //     },
  //     (error) => {
  //       console.log('Error al obtener los usuarios:', error);
  //     }
  //   );
  // }

  getUsuarios(): void {
    
    this.usuarioService.getUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.Usuarios = usuarios;
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

  editUsuario(usuario: Usuario) {
    if (usuario) {
      this.usuarioSeleccionado = usuario;
      this.usuariosForm.patchValue({
        username: usuario.username,
        nombre_completo: usuario.nombre_completo,
        documento: usuario.documento,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        password: usuario.password,
        estado: usuario.estado,
      });
      this.submitted = false;
      this.EditarUsuarioDialog = true; 
    }
  }


  deleteUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.deleteUsuarioDialog = true;
  }


  deleteAllUsuarios() {
    this.usuarioService.deleteAllUsuarios().subscribe(
      (response) => {
        // Aquí puedes manejar la respuesta exitosa del servidor
        console.log(response);
      },
      (error) => {
        // Aquí puedes manejar el error en caso de que ocurra
        console.error(error);
      }
    );
  }
  

  confirmDelete() {
    if (
      this.usuarioSeleccionado &&
      typeof this.usuarioSeleccionado._id === 'string'
    ) {
      this.deleteUsuarioDialog = false;

      this.usuarioService.deleteUsuario(this.usuarioSeleccionado._id).subscribe(
        (response) => {
          console.log('Usuario eliminado exitosamente:', response);
          this.getUsuarios();
        },
        (error) => {
          console.log('Error al eliminar el usuario:', error);
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

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
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
