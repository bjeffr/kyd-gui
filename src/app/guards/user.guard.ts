import {Inject, Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {WEB3} from '../web3';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(@Inject(WEB3) private web3: Web3,
              private router: Router) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const accounts = await this.web3.eth.getAccounts();

    if (accounts.length === 0) {
      return this.router.createUrlTree(['/login']);
    } else {
      console.log(accounts);
      return true;
    }
  }
}
