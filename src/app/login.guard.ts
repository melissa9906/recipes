import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServicesService } from './services/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthServicesService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.checkLoggin();
  }

  checkLoggin(): boolean {
    if (this.auth.isLoggedIn === false) {
      return true;
    } else {
    this.router.navigate(['/dashboard']);
    return false;
  }
 }
}
