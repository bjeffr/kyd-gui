import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WEB3} from '../../web3';
import Web3 from 'web3';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(WEB3) private web3: Web3,
              private router: Router) { }

  async ngOnInit() {
    if (this.web3.currentProvider) {
      // @ts-ignore
      await this.web3.currentProvider.enable();
      this.router.navigate(['']);
    }
  }
}
