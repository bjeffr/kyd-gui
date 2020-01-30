import {AbstractControl, ValidatorFn} from '@angular/forms';

export function matchingPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const password = control.get('password').value;
    const repeatPassword = control.get('repeatPassword').value;
    return password !== repeatPassword ? {passwordsNotMatching: true} : null;
  };
}
