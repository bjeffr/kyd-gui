import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DeviceRegistrationComponent } from './components/device-registration/device-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ParticularsComponent } from './components/user-registration/components/particulars/particulars.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { LoginDataComponent } from './components/user-registration/components/login-data/login-data.component';
import {AngularMaterialModule} from './angular-material.module';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

@NgModule({
  declarations: [
    AppComponent,
    DeviceRegistrationComponent,
    UserRegistrationComponent,
    ParticularsComponent,
    LoginDataComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FontAwesomeModule,
    MatSelectCountryModule,
    Ng2TelInputModule,
    MatPasswordStrengthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
