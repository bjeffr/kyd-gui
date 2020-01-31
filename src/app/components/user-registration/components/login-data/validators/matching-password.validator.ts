import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const matchingPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.value.password;
  const repeatPassword = control.value.repeatPassword;
  return password !== repeatPassword ? {passwordsNotMatching: true} : null;
};
