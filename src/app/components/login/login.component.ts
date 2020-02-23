import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../services/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

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
              private router: Router) { }

  ngOnInit() {
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
