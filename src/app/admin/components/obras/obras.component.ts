import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/admin/models/materiales';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MaterialService } from 'src/app/admin/service/material.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.scss']
})
export class ObrasComponent implements OnInit {

  MaterialDialog: boolean = false;

  EditarMaterialDialog: boolean = false;

  deleteMaterialDialog: boolean = false;

  deleteMaterialesDialog: boolean = false;

  selectedMateriales: Material[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  Material: Material = {
    _id: '',
    nombre_material: '',
    proveedor: '',
    estado: 0,
    fecha: new Date()
  };



  MaterialsForm!: FormGroup;

  modificarMaterialForm!: FormGroup;

  Materials: Material[] = [];

  MaterialSeleccionado!: Material;

  constructor(
    private materialService: MaterialService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMaterials();
    this.initForm();
  

    this.cols = [
      { field: 'nombre_Material', header: 'Nombre Material' },
      { field: 'proveedor', header: 'Proveedor' },
      { field: 'estado', header: 'Estado' },
      { field: 'fecha ingreso', header: 'Fecha ingreso' },
      // { field: 'imagen', header: 'Imagen' }

  ];

    this.statuses = [
      { label: 'Disponible', value: '1' },
      { label: 'Agotado', value: '0' },
    ];

 

  }

  initForm(): void {
    this.MaterialsForm = this.formBuilder.group({
      nombre_material: ['', Validators.required],
      proveedor: ['', Validators.required],
      estado: ['1', Validators.required],
      fecha: ['',],
    });
  }

  saveMaterial(): void {
    this.submitted = true;

  
    if (this.MaterialsForm.invalid) {
      return;
    }
  
    const formData = this.MaterialsForm.value;
  
   
  
    this.materialService.saveMaterial(formData).subscribe(
      (response) => {
        console.log('Material registrado exitosamente:', response);
        this.getMaterials();
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado exitoso',
          detail: 'Registrado correctamente',
          life: 3000,
        });
        this.MaterialDialog = false;
      },
      (error) => {
        console.log('Error al registrar el Material:', error);
      }
    );
  }
  
  updateMaterial(): void {
    this.submitted = true;

 
    const formData = this.MaterialsForm.value;

    formData.id_Material = this.MaterialSeleccionado._id; // Agrega el ID del Material al formulario

    this.materialService.updateMaterial(formData.id_Material, formData).subscribe(
      (response) => {
        console.log('Material actualizado exitosamente:', response);
        this.getMaterials();
        this.messageService.add({
          severity: 'success',
          summary: 'Actualización exitosa',
          detail: 'Material actualizado correctamente',
          life: 3000,
        });
        this.EditarMaterialDialog = false;
      },
      (error) => {
        console.log('Error al actualizar el Material:', error);
      }
    );
  }




  // getMaterials(): void {
  //   this.materialService.getMaterial().subscribe(
  //     (response: Material[]) => {
  //       this.Materials = response;
  //     },
  //     (error) => {
  //       console.log('Error al obtener los Materials:', error);
  //     }
  //   );
  // }


  getMaterials(): void {
    this.materialService.getMaterial().subscribe(
      (materiales: Material[]) => {
        this.Materials = materiales;
      },
      (error) => {
        console.log('Error al obtener los empleados:', error);
      }
    );
  }


  openNew() {
    this.submitted = false;
    this.MaterialDialog = true;
    this.MaterialsForm.reset();
  }

  deleteselectedMateriales() {
    this.deleteMaterialesDialog = true;
  }

  editMaterial(Material: Material) {
    if (Material) {
      this.MaterialSeleccionado = Material;
      this.MaterialsForm.patchValue({
        nombre_material: Material.nombre_material,
        proveedor: Material.proveedor,
        estado: Material.estado
        
      });
      this.submitted = false;
      this.EditarMaterialDialog = true; // Utiliza la propiedad correcta
    }
  }


  deleteMaterial(Material: Material) {
    this.MaterialSeleccionado = Material;
    this.deleteMaterialDialog = true;
  }

  confirmDelete() {
    if (
      this.MaterialSeleccionado &&
      typeof this.MaterialSeleccionado._id === 'string'
    ) {
      this.deleteMaterialDialog = false;

      this.materialService.deleteMaterial(this.MaterialSeleccionado._id).subscribe(
        (response) => {
          console.log('Material eliminado exitosamente:', response);
          this.getMaterials();
        },
        (error) => {
          console.log('Error al eliminar el Material:', error);
        }
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Acción exitosa',
        detail: 'Material eliminado',
        life: 3000,
      });
    }
  }

  confirmDeleteSelected() {
    this.deleteMaterialDialog = false;

    this.Materials = this.Materials.filter(val => !this.selectedMateriales.includes(val)); //Elimina los productos seleccionados del array products 
    
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Materiales eliminados', life: 3000 });
    
    this.selectedMateriales = []; //indica que ya no hay productos seleccionados para eliminar

}

  seleccionarMaterial(Material: Material) {
    this.MaterialSeleccionado = Material;
  }

  hideDialog() {
    this.MaterialDialog = false;
    this.EditarMaterialDialog = false; // Asegúrate de ocultar la ventana modal de edición también
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
