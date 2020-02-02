import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../services/user.service';

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
              private authService: UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    this.authService.login(this.form).subscribe();
  }

}
