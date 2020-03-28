import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../services/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {EthereumService} from '../../services/ethereum.service';
import {WEB3} from '../../web3';
import Web3 from 'web3';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  envelopeIcon = faEnvelope;
  keyIcon = faKey;
  hide = true;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private jwtHelperService: JwtHelperService,
              private router: Router,
              @Inject(WEB3) private web3: Web3,
              private ethereumService: EthereumService) { }

  async ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.max(150)
      ])],
      password: [null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30)
        ])],
    });

    // @ts-ignore
    await this.web3.currentProvider.enable();

    // const address = await this.ethereumService.addDevice(this.web3);
    // console.log(address);
  }

  onSubmit() {
    this.userService.login(this.form).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  resetPassword() {
    // ToDo Implement
  }
}
