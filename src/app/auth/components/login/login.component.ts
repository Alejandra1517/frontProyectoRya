import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoginServiceService } from '../../service/login.service.service';
import { Router } from '@angular/router';

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
    providers: [MessageService]
})
export class LoginComponent {

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  

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
  
    formSubmit() {
      if (this.loginData.username.trim() === '' || this.loginData.username.trim() === null) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El nombre de usuario es requerido' });
        return;
      }
  
      if (this.loginData.password.trim() === '' || this.loginData.password.trim() === null) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La contraseña es requerida' });
        return;
      }
  
      this.loginService.generateToken(this.loginData).subscribe(
        (data: any) => {
          console.log(data);

          //Se almacenan los datos en el local storage
          this.loginService.loginUser(data.token);

          //obtiene los datos del usuario autenticado
          this.loginService.getCurrentUser().subscribe((user: any) => {
            this.loginService.setUser(user);
            console.log(user);
  
            if (this.loginService.getUserRole() === 'ADMIN') {
              this.router.navigate(['layout']);
              this.loginService.loginStatusSubjec.next(true);
            // } else if (this.loginService.getUserRole() === 'NORMAL') {
            //   this.router.navigate(['customer']);
            //   this.loginService.loginStatusSubjec.next(true);
            } else {
              this.loginService.logout();
            }
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Detalles inválidos, vuelva a intentar' });
        }
      );
    }
}
