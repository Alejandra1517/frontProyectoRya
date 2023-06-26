import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from './login.service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  

  constructor(private loginService:LoginServiceService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginService.isLoggedIn() && this.loginService.getUserRole() == '6498c9e9f556bfabc8c92075'){
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
  
}
