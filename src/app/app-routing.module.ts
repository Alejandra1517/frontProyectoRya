import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AdminGuard } from './auth/service/admin.guard';

const routes: Routes = [
    {
          path: '', component: AppLayoutComponent,

        children: [
          { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
          // { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.AuthModule) },
        ]
    },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }














// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AppLayoutComponent } from './layout/app.layout.component';
// import { LoginComponent } from './auth/components/login/login.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige al componente de inicio de sesión por defecto

//   { path: 'login', component: LoginComponent }, // Componente de inicio de sesión

//   {
//     path: 'admin', // Ruta para el módulo de administrador
//     component: AppLayoutComponent, // Componente del diseño de la aplicación (layout)
//     children: [
//       { path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
//     ],
//     // canActivate: [AuthGuardAdmin] // Guardia de ruta para validar el inicio de sesión como administrador
//   },

//   {
//     path: 'cliente', // Ruta para el módulo de cliente
//     component: AppLayoutComponent, // Componente del diseño de la aplicación (layout)
//     children: [
//       { path: '', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) }
//     ],
//     // canActivate: [AuthGuardClient] // Guardia de ruta para validar el inicio de sesión como cliente
//   },

//   // { path: 'notfound', component: NotFoundComponent }, // Componente para la página de "no encontrado"

//   { path: '**', redirectTo: 'notfound' } // Redirige a la página de "no encontrado" para cualquier otra ruta no especificada
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }