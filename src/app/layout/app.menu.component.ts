import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { LoginServiceService } from '../auth/service/login.service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(
    public layoutService: LayoutService,
    public loginService: LoginServiceService,
  ) {}

  ngOnInit() {
    const user = this.loginService.getUser();
  

    console.log(user)

    const userPermissions = [
      user.configuracion,
      user.usuarios,
      user.materiales,
      user.servicios,
      user.empleados,
      user.clientes,
      user.solicitudes,
      user.cotizaciones,
      user.obras
    ];
  
    console.log(userPermissions)

    this.model = [
      {
        label: 'Opciones',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Configuración',
            icon: 'pi pi-cog',
            routerLink: ['/admin/roles'],
            visible: userPermissions[0],
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-users',
            routerLink: ['/admin/usuarios'],
            visible: userPermissions[1],
          },
          {
            label: 'Materiales',
            icon: 'pi pi-wrench',
            routerLink: ['/admin/materiales'],
            visible: userPermissions[2],
          },
          {
            label: 'Servicios',
            icon: 'pi pi-building',
            routerLink: ['/admin/servicios'],
            visible: userPermissions[3],
          },
          {
            label: 'Empleados',
            icon: 'pi pi-cog',
            routerLink: ['/admin/empleados'],
            visible: userPermissions[4],
          },
          {
            label: 'Clientes',
            icon: 'pi pi-users',
            routerLink: ['/admin/clientes'],
            visible: userPermissions[5],
          },
          {
            label: 'Solicitudes',
            icon: 'pi pi-truck',
            routerLink: ['/admin/solicitudes'],
            visible: userPermissions[6],
          },
          {
            label: 'Cotizaciones',
            icon: 'pi pi-file',
            routerLink: ['/admin/cotizaciones'],
            visible: userPermissions[7],
          },
          {
            label: 'Obras',
            icon: 'pi pi-home',
            routerLink: ['/admin/obras'],
            visible: userPermissions[8],
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            routerLink: ['/auth/login'],
          },
        ],
      },
    ];
  }
  
}


