import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AdminGuard } from './auth/service/admin.guard';

const routes: Routes = [
    {
          path: '', component: AppLayoutComponent, canActivate: [AdminGuard],

        children: [
          { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
          // { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.AuthModule) },
        ]
    },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })], // Utiliza useHash: false para enrutamiento basado en HTML5
  exports: [RouterModule]
})
export class AppRoutingModule { }
