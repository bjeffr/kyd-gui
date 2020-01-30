import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
import {matchingPasswordValidator} from '../../validators/matching-password.validator';

@Component({
  selector: 'app-login-data',
  templateUrl: './login-data.component.html',
  styleUrls: ['./login-data.component.scss']
})
export class LoginDataComponent implements OnInit {

  @Input() user: FormGroup;
  @Output() continue: EventEmitter<null> = new EventEmitter();
  form: FormGroup;
  envelopeIcon = faEnvelope;
  keyIcon = faKey;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: this.user.get('email'),
      password: this.user.get('password'),
      repeatPassword: new FormControl(null, Validators.required)
    }, {validators: [matchingPasswordValidator()]});
  }

  next() {
    this.user.patchValue({
      email: this.form.value.email,
      password: this.form.value.password
    });
    this.continue.emit();
  }

}
