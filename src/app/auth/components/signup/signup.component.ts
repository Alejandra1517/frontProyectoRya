import  Swal  from 'sweetalert2';
import { UserService } from '../../service/user.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  };

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  formSubmit(): void {
    console.log(this.user);
    if (this.user.username === '' || this.user.username === null) {
      alert('El nombre de usuario es requerido!!');
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con éxito en el sistema', 'success');
      },
      (error) => {
        console.log(error);
        alert('Ha ocurrido un error en el sistema!!');
      }
    );
  }
}
