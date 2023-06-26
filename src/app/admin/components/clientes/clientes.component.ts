import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/admin/models/clientes';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClienteService } from 'src/app/admin/service/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  // providers: [MessageService]
})
export class ClientesComponent implements OnInit {
  ClienteDialog: boolean = false;
  EditarClienteDialog: boolean = false;
  deleteClienteDialog: boolean = false;
  deleteClientesDialog: boolean = false;
  selectedClientes: Cliente[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  Cliente: Cliente = {
    _id: '',
    nombre_cliente: '',
    documento: '',
    telefono: '',
    direccion: '',
    estado: 0
  };
  clientesForm!: FormGroup;
  modificarClienteForm!: FormGroup;
  clientes: Cliente[] = [];
  clienteSeleccionado!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getClientes();
    this.initForm();

    this.cols = [
      { field: 'nombre_cliente', header: 'Nombre Cliente' },
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
    this.clientesForm = this.formBuilder.group({
      nombre_cliente: ['', Validators.required],
      documento: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      estado: ['1', Validators.required],
    });
  }

  saveCliente(): void {
    this.submitted = true;

    if (this.clientesForm.invalid) {
      return;
    }

    const formData = this.clientesForm.value;
    this.clienteService.saveCliente(formData).subscribe(
      (response) => {
        console.log('Cliente registrado exitosamente:', response);
        this.getClientes();
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado exitoso',
          detail: 'Registrado correctamente',
          life: 3000,
        });
        this.ClienteDialog = false;
      },
      (error) => {
        console.log('Error al registrar el cliente:', error);
      }
    );
  }


  updateCliente(): void {
    this.submitted = true;

 
    const formData = this.clientesForm.value;

    formData.id_cliente = this.clienteSeleccionado._id; // Agrega el ID del cliente al formulario

    this.clienteService.updateCliente(formData.id_cliente, formData).subscribe(
      (response) => {
        console.log('Cliente actualizado exitosamente:', response);
        this.getClientes();
        this.messageService.add({
          severity: 'success',
          summary: 'Actualización exitosa',
          detail: 'Cliente actualizado correctamente',
          life: 3000,
        });
        this.EditarClienteDialog = false;
      },
      (error) => {
        console.log('Error al actualizar el cliente:', error);
      }
    );
  }


  getClientes(): void {
    this.clienteService.getClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      (error) => {
        console.log('Error al obtener los clientes:', error);
      }
    );
  }
  


  openNew() {
    this.submitted = false;
    this.ClienteDialog = true;
    this.clientesForm.reset();
  }

  deleteSelectedClientes() {
    this.deleteClientesDialog = true;
  }

  editCliente(cliente: Cliente) {
    if (cliente) {
      this.clienteSeleccionado = cliente;
      this.clientesForm.patchValue({
        nombre_cliente: cliente.nombre_cliente,
        documento: cliente.documento,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        estado: cliente.estado,
      });
      this.submitted = false;
      this.EditarClienteDialog = true; // Utiliza la propiedad correcta
    }
  }


  deleteCliente(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.deleteClienteDialog = true;
  }

  confirmDelete() {
    if (
      this.clienteSeleccionado &&
      typeof this.clienteSeleccionado._id === 'string'
    ) {
      this.deleteClienteDialog = false;

      console.log(this.clienteSeleccionado._id)
      this.clienteService.deleteCliente(this.clienteSeleccionado._id).subscribe(
        (response) => {
          console.log('Cliente eliminado exitosamente:', response);
          this.getClientes();
        },
        (error) => {
          console.log('Error al eliminar el cliente:', error);
        }
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Acción exitosa',
        detail: 'Cliente eliminado',
        life: 3000,
      });
    }
  }


  eliminarRegistros(): void {
    this.clienteService.deleteAllClientes().subscribe(
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
    this.deleteClienteDialog = false;

    this.clientes = this.clientes.filter(val => !this.selectedClientes.includes(val)); //Elimina los productos seleccionados del array products 
    
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    
    this.selectedClientes = []; //indica que ya no hay productos seleccionados para eliminar

}

  seleccionarCliente(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
  }

  hideDialog() {
    this.ClienteDialog = false;
    this.EditarClienteDialog = false; // Asegúrate de ocultar la ventana modal de edición también
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
