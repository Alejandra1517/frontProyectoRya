import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoginServiceService } from '../../service/login.service.service';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
})



export class LoginComponent implements OnInit {

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public modulos: any = {};

  

    valCheck: string[] = ['remember'];

    loginData = {
      "username": '',
      "password": '',
    }
  
    constructor(
      private messageService: MessageService,
      private loginService: LoginServiceService,
      private router: Router
    ) { }


  ngOnInit(): void {
 
  }

 

  formSubmit() {
    if (this.loginData.username.trim() === '' || this.loginData.username.trim() === null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El nombre de usuario es obligatorio' });
      return;
    }

    if (this.loginData.password.trim() === '' || this.loginData.password.trim() === null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La contraseña es obligatoria' });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);

        // Almacena los datos en el local storage
        this.loginService.loginUser(data.token);

        // Obtiene los datos del usuario autenticado
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            console.log(user);

            if (this.loginService.getUserRole() === '649c4e46ef2c0bda10cf8322') {
              console.log("Administrador");
              this.router.navigate(['/']);
              this.loginService.loginStatusSubject.next(true);
            } else if (this.loginService.getUserRole() === '649c15b61bd2c95b8ec5132b') {
              console.log("Cliente");
              this.router.navigate(['/']);
              this.loginService.loginStatusSubject.next(true);
            } else {
              this.loginService.logout();
            }
          },
        );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.error && error.error.msg) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.msg });
        } else {
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Detalles inválidos, vuelva a intentar' });
        }
      }
    );

  }

  


}
