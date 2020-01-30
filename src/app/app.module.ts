import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DeviceRegistrationComponent } from './device-registration/device-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
} from '@angular/material';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ParticularsComponent } from './user-registration/particulars/particulars.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { LoginDataComponent } from './user-registration/login-data/login-data.component';

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
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FontAwesomeModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectCountryModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
