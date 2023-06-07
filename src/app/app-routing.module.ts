import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
            //   { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
        ]
    },

  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
