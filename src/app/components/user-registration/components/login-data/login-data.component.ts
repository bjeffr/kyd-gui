import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
import {matchingPasswordValidator} from '../../../../validators/matching-password.validator';

@Component({
  selector: 'app-login-data',
  templateUrl: './login-data.component.html',
  styleUrls: ['./login-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDataComponent implements OnInit {

  @Input() user: FormGroup;
  @Output() continue: EventEmitter<null> = new EventEmitter();
  form: FormGroup;
  envelopeIcon = faEnvelope;
  keyIcon = faKey;
  hide = true;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) { }

  onStrengthChanged(strength: number) {
    if (strength < 100) {
      this.form.get('password').setErrors({weakPassword: true});
    }
    this.cd.detectChanges();
    console.log(this.form.hasError('passwordsNotMatching'));
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: this.user.get('email'),
      password: this.user.get('password'),
      repeatPassword: new FormControl(null, Validators.required),
    }, {validators: [matchingPasswordValidator]});

    this.form.valueChanges.subscribe(() => {
      console.log(this.form.get('email').errors);
      if (this.form.hasError('passwordsNotMatching')) {
        this.form.get('repeatPassword').setErrors({passwordsNotMatching: true});
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.user.patchValue({
        email: this.form.value.email,
        password: this.form.value.password
      });
      this.continue.emit();
    }
  }

}
