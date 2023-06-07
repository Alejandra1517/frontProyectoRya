import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
        
            {
                label: 'Opciones',
                icon: 'pi pi-fw pi-briefcase',
                items: [
               
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/admin/crud']
                    },

                    {
                        label: 'Clientes',
                        icon: 'pi pi-users',
                        routerLink: ['/admin/clientes']
                    }
                 
                ]
            },

        ];
    }
}
