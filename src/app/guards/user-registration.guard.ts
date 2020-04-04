import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (await this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']).then();
      return false;
    }
  }
}
