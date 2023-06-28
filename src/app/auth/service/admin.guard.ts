import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from './login.service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginServiceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isLoggedIn() && this.loginService.getToken()) {
      const userRole = this.loginService.getUserRole();

      if (userRole === '649c4e46ef2c0bda10cf8322' || userRole === '649c15b61bd2c95b8ec5132b') {
        return true; // Usuario válido para acceder a la ruta protegida
      } else {
        // Redirigir al usuario a una página de acceso no autorizado
        return this.router.createUrlTree(['/unauthorized']);
      }
    }

    // El usuario no está autenticado o no ha generado el token, redirigir a la página de inicio de sesión
    return this.router.createUrlTree(['/login']);
  }
}
